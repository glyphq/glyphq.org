"use client";

import { LogoApple, LogoLinux, LogoWindows } from "@gravity-ui/icons";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { trackDownload } from "../lib/analytics";
import { getCachedPlatform } from "../lib/platform";
import type { DownloadPlatform, PlatformId } from "../lib/releases";

interface Props {
  platforms: DownloadPlatform[];
  releaseUrl: string;
  version: string;
}

const icons = {
  windows: LogoWindows,
  macos: LogoApple,
  linux: LogoLinux,
};

export default function DownloadHeroCta({ platforms, releaseUrl, version }: Props) {
  const [detected, setDetected] = useState<PlatformId | null>(null);

  useEffect(() => {
    setDetected(getCachedPlatform());
  }, []);

  const active = platforms.find((platform) => platform.id === detected) ?? null;
  const href = active?.url ?? releaseUrl;
  const label = version ? `Glyph Wallet ${version}` : "Glyph Wallet";
  const PlatformIcon = detected ? icons[detected] : null;

  return (
    <motion.a
      href={href}
      onClick={() => active && trackDownload(active.id)}
      aria-label={active ? `${label} for ${active.name}` : label}
      whileTap={{ scale: 0.97 }}
      className="corner-frame inline-flex items-center justify-center gap-2 rounded-[3px] bg-accent px-5 py-3 font-mono text-[15px] font-medium text-night transition-colors duration-150 hover:bg-accent-strong"
    >
      {PlatformIcon ? (
        <PlatformIcon width={16} height={16} aria-hidden="true" />
      ) : (
        <span className="glyph-logo size-4" aria-hidden="true" />
      )}
      {label}
    </motion.a>
  );
}
