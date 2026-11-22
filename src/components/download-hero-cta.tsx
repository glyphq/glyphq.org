"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { detectPlatform } from "../lib/platform";
import type { DownloadPlatform, PlatformId } from "../lib/releases";

interface Props {
  platforms: DownloadPlatform[];
  releaseUrl: string;
}

export default function DownloadHeroCta({ platforms, releaseUrl }: Props) {
  const [detected, setDetected] = useState<PlatformId | null>(null);

  useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  const active = platforms.find((platform) => platform.id === detected) ?? null;
  const href = active?.url ?? releaseUrl;
  const label = active ? `Download for ${active.name}` : "Download Glyph";

  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-display text-base font-semibold text-night transition-colors duration-150 hover:bg-white/90"
    >
      <span className="glyph-logo size-4" aria-hidden="true" />
      {label}
    </motion.a>
  );
}
