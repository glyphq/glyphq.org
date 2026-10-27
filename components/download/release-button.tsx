"use client";

import { OsIcon } from "@/components/download/os-icon";
import {
  SiteButtonLink,
  type SiteButtonSize,
} from "@/components/ui/site-button";
import type { WalletRelease } from "@/lib/releases";
import { siteConfig } from "@/lib/site";
import { useOperatingSystem } from "@/lib/use-operating-system";

export function ReleaseDownloadButton({
  release,
  size = "lg",
}: {
  release: WalletRelease | null;
  size?: SiteButtonSize;
}) {
  const { os, label } = useOperatingSystem();

  const href =
    (os === "macos" && release?.downloads.macos?.url) ||
    (os === "windows" && release?.downloads.windows?.url) ||
    (os === "linux" && release?.downloads.appimage?.url) ||
    release?.url ||
    siteConfig.links.releases;

  return (
    <SiteButtonLink href={href} external size={size}>
      <OsIcon os={os} size={16} />
      {os === "unknown" ? "Open the latest release" : `Download for ${label}`}
    </SiteButtonLink>
  );
}
