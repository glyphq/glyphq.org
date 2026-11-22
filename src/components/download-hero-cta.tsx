"use client";

import { SiApple, SiLinux } from "@icons-pack/react-simple-icons";
import { MonitorIcon } from "@solar-icons/react/linear/monitor";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { trackDownload } from "../lib/analytics";
import { detectPlatform } from "../lib/platform";
import type { DownloadPlatform, PlatformId } from "../lib/releases";

interface Props {
  platforms: DownloadPlatform[];
  releaseUrl: string;
  version: string;
}

const icons = {
  windows: MonitorIcon,
  macos: SiApple,
  linux: SiLinux,
};

export default function DownloadHeroCta({ platforms, releaseUrl, version }: Props) {
  const [detected, setDetected] = useState<PlatformId | null>(null);

  useEffect(() => {
    setDetected(detectPlatform());
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
      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-base font-semibold text-night transition-colors duration-150 hover:bg-accent-strong"
    >
      {PlatformIcon ? (
        <PlatformIcon size={16} color="currentColor" aria-hidden="true" />
      ) : (
        <span className="glyph-logo size-4" aria-hidden="true" />
      )}
      {label}
    </motion.a>
  );
}
