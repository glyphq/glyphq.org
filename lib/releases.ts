import { cacheLife } from "next/cache";

const releaseUrl = "https://api.github.com/repos/glyphq/wallet/releases/latest";

type GitHubAsset = {
  name: string;
  browser_download_url: string;
  size: number;
  digest?: string | null;
};

type GitHubRelease = {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  assets: GitHubAsset[];
};

export type WalletAsset = {
  name: string;
  url: string;
  size: number;
  sha256: string | null;
};

export type WalletRelease = {
  tag: string;
  name: string;
  publishedAt: string;
  url: string;
  downloads: {
    windows?: WalletAsset;
    macos?: WalletAsset;
    appimage?: WalletAsset;
    deb?: WalletAsset;
    rpm?: WalletAsset;
  };
  checksums: WalletAsset[];
};

export async function getLatestRelease(): Promise<WalletRelease | null> {
  "use cache";
  cacheLife("hours");

  try {
    const response = await fetch(releaseUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "glyphq.org",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) return null;

    const release = (await response.json()) as GitHubRelease;
    const assets = release.assets.map(toWalletAsset);

    const findAsset = (suffix: string) =>
      assets.find((asset) => asset.name.endsWith(suffix));

    const downloads = {
      windows: findAsset(".exe"),
      macos: findAsset(".dmg"),
      appimage: findAsset(".AppImage"),
      deb: findAsset(".deb"),
      rpm: findAsset(".rpm"),
    };

    return {
      tag: release.tag_name,
      name: release.name,
      publishedAt: release.published_at,
      url: release.html_url,
      downloads,
      checksums: Object.values(downloads).filter(
        (asset): asset is WalletAsset => Boolean(asset),
      ),
    };
  } catch {
    return null;
  }
}

function toWalletAsset(asset: GitHubAsset): WalletAsset {
  return {
    name: asset.name,
    url: asset.browser_download_url,
    size: asset.size,
    sha256: asset.digest?.replace(/^sha256:/, "") ?? null,
  };
}

export function formatBytes(bytes: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(bytes / 1024 / 1024)} MB`;
}

export function formatReleaseDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
