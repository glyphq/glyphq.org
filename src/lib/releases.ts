export interface ReleaseAsset {
  name: string;
  url: string;
  digest?: string;
}

export interface Release {
  tag: string;
  name: string;
  publishedAt: string;
  url: string;
  body: string;
  prerelease: boolean;
  assets: ReleaseAsset[];
}

export type PlatformId = "windows" | "macos" | "linux";

export interface DownloadPlatform {
  id: PlatformId;
  name: string;
  detail: string;
  url: string;
  extras: { label: string; url: string }[];
}

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  digest?: string | null;
}

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  published_at: string;
  html_url: string;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  assets: GitHubAsset[];
}

export const releasesPage = "https://github.com/glyphq/wallet/releases";

const cache = new Map<number, Promise<Release[]>>();
const releasesFeed = "https://github.com/glyphq/wallet/releases.atom";

const decodeEntities = (value: string) =>
  value.replace(/&(lt|gt|quot|#39|amp);/g, (_, entity: string) => {
    const map: Record<string, string> = {
      lt: "<",
      gt: ">",
      quot: '"',
      "#39": "'",
      amp: "&",
    };
    return map[entity] ?? `&${entity};`;
  });

const fetchReleaseFeed = async (limit: number): Promise<Release[]> => {
  try {
    const response = await fetch(releasesFeed, {
      headers: { "User-Agent": "glyphq-landing" },
    });
    if (!response.ok) return [];
    const xml = await response.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, limit);

    return entries
      .map(([, entry]) => {
        const href =
          entry.match(/<link[^>]*href="([^"]+)"[^>]*rel="alternate"[^>]*\/>/)?.[1] ??
          entry.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"[^>]*\/>/)?.[1] ??
          "";
        const tag = decodeEntities(href.split("/tag/")[1] ?? "");
        const name = decodeEntities(
          entry.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? tag,
        );
        const publishedAt = entry.match(/<updated>([^<]+)<\/updated>/)?.[1] ?? "";
        const content = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/)?.[1] ?? "";

        return {
          tag,
          name: name || tag,
          publishedAt,
          url: href,
          body: decodeEntities(content).trim(),
          prerelease: tag.includes("-"),
          assets: [],
        };
      })
      .filter((release) => release.tag && release.url);
  } catch {
    return fetchReleaseFeed(limit);
  }
};

const fetchReleases = async (limit: number): Promise<Release[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/glyphq/wallet/releases?per_page=${limit}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "glyphq-landing",
        },
      },
    );
    if (!response.ok) return fetchReleaseFeed(limit);
    const data = (await response.json()) as GitHubRelease[];
    return data
      .filter((release) => !release.draft)
      .map((release) => ({
        tag: release.tag_name,
        name: release.name ?? release.tag_name,
        publishedAt: release.published_at,
        url: release.html_url,
        body: release.body ?? "",
        prerelease: release.prerelease,
        assets: release.assets.map((asset) => ({
          name: asset.name,
          url: asset.browser_download_url,
          digest: asset.digest ?? undefined,
        })),
      }));
  } catch {
    return fetchReleaseFeed(limit);
  }
};

export const getReleases = (limit = 6): Promise<Release[]> => {
  const cached = cache.get(limit);
  if (cached) return cached;
  const request = fetchReleases(limit);
  cache.set(limit, request);
  return request;
};

export const getChangelogReleases = async (limit = 8): Promise<Release[]> => {
  const releases = await getReleases(limit + 8);
  return releases.filter((release) => !release.prerelease).slice(0, limit);
};

const findAsset = (assets: ReleaseAsset[], extensions: string[]) =>
  assets.find((asset) =>
    extensions.some((extension) => asset.name.toLowerCase().endsWith(extension)),
  );

export const buildPlatforms = (release?: Release): DownloadPlatform[] => {
  const assets = release?.assets ?? [];
  const fallback = release?.url ?? releasesPage;
  const version = release?.tag.replace(/^v/, "");
  const directAsset = (name: string) =>
    release && version
      ? `https://github.com/glyphq/wallet/releases/download/${release.tag}/${name}`
      : fallback;

  const windows = findAsset(assets, [".exe"]);
  const windowsMsi = findAsset(assets, [".msi"]);
  const macos = findAsset(assets, [".dmg"]);
  const linux = findAsset(assets, [".appimage"]);
  const linuxDeb = findAsset(assets, [".deb"]);
  const linuxRpm = findAsset(assets, [".rpm"]);
  const windowsUrl = windows?.url ?? directAsset(`Glyph.Wallet_${version}_x64-setup.exe`);
  const macosUrl = macos?.url ?? directAsset(`Glyph.Wallet_${version}_universal.dmg`);
  const linuxUrl = linux?.url ?? directAsset(`Glyph.Wallet_${version}_amd64.AppImage`);

  return [
    {
      id: "windows",
      name: "Windows",
      detail: version ? "x64 installer" : "See all builds",
      url: windowsUrl,
      extras: windowsMsi ? [{ label: "MSI", url: windowsMsi.url }] : [],
    },
    {
      id: "macos",
      name: "macOS",
      detail: version ? "Universal build" : "See all builds",
      url: macosUrl,
      extras: [],
    },
    {
      id: "linux",
      name: "Linux",
      detail: version ? "AppImage" : "See all builds",
      url: linuxUrl,
      extras: [
        ...(linuxDeb ? [{ label: "deb", url: linuxDeb.url }] : []),
        ...(linuxRpm ? [{ label: "rpm", url: linuxRpm.url }] : []),
      ],
    },
  ];
};
