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
  assets: GitHubAsset[];
}

export const releasesPage = "https://github.com/glyphq/wallet/releases";

const cache = new Map<number, Promise<Release[]>>();

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
    if (!response.ok) return [];
    const data = (await response.json()) as GitHubRelease[];
    return data
      .filter((release) => !release.draft)
      .map((release) => ({
        tag: release.tag_name,
        name: release.name ?? release.tag_name,
        publishedAt: release.published_at,
        url: release.html_url,
        body: release.body ?? "",
        assets: release.assets.map((asset) => ({
          name: asset.name,
          url: asset.browser_download_url,
          digest: asset.digest ?? undefined,
        })),
      }));
  } catch {
    return [];
  }
};

export const getReleases = (limit = 6): Promise<Release[]> => {
  const cached = cache.get(limit);
  if (cached) return cached;
  const request = fetchReleases(limit);
  cache.set(limit, request);
  return request;
};

const findAsset = (assets: ReleaseAsset[], extensions: string[]) =>
  assets.find((asset) =>
    extensions.some((extension) => asset.name.toLowerCase().endsWith(extension)),
  );

export const buildPlatforms = (release?: Release): DownloadPlatform[] => {
  const assets = release?.assets ?? [];
  const fallback = release?.url ?? releasesPage;
  const windows = findAsset(assets, [".exe"]);
  const windowsMsi = findAsset(assets, [".msi"]);
  const macos = findAsset(assets, [".dmg"]);
  const linux = findAsset(assets, [".appimage"]);
  const linuxDeb = findAsset(assets, [".deb"]);
  const linuxRpm = findAsset(assets, [".rpm"]);

  return [
    {
      id: "windows",
      name: "Windows",
      detail: windows ? "x64 installer" : "See all builds",
      url: windows?.url ?? fallback,
      extras: windowsMsi ? [{ label: "MSI", url: windowsMsi.url }] : [],
    },
    {
      id: "macos",
      name: "macOS",
      detail: macos ? "Universal build" : "See all builds",
      url: macos?.url ?? fallback,
      extras: [],
    },
    {
      id: "linux",
      name: "Linux",
      detail: linux ? "AppImage" : "See all builds",
      url: linux?.url ?? fallback,
      extras: [
        ...(linuxDeb ? [{ label: "deb", url: linuxDeb.url }] : []),
        ...(linuxRpm ? [{ label: "rpm", url: linuxRpm.url }] : []),
      ],
    },
  ];
};
