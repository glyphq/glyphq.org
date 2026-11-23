"use client";

import { LogoApple, LogoLinux, LogoWindows } from "@gravity-ui/icons";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { trackDownload } from "../lib/analytics";
import { getCachedPlatform } from "../lib/platform";
import type { DownloadPlatform, PlatformId } from "../lib/releases";

interface Props {
  platforms: DownloadPlatform[];
}

const icons = {
  windows: LogoWindows,
  macos: LogoApple,
  linux: LogoLinux,
};

export default function DownloadPicker({ platforms }: Props) {
  const [detected, setDetected] = useState<PlatformId | null>(null);

  useEffect(() => {
    setDetected(getCachedPlatform());
  }, []);

  return (
    <div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {platforms.map((platform) => {
          const Icon = icons[platform.id];
          const isActive = platform.id === detected;
          return (
            <div
              key={platform.id}
              className="corner-frame corner-frame-card relative overflow-hidden rounded-[4px] bg-surface p-5 md:p-6"
            >
              <span className="hairline-mask" aria-hidden="true" />
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <Icon width={28} height={28} aria-hidden="true" />
                  <h3 className="text-xl font-medium text-ink">{platform.name}</h3>
                  {isActive && (
                    <span className="rounded-[2px] bg-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-soft">
                      Detected
                    </span>
                  )}
                </div>
                <p className="mt-3 text-base text-muted">{platform.detail}</p>
                <motion.a
                  href={platform.url}
                  onClick={() => trackDownload(platform.id)}
                  whileTap={{ scale: 0.97 }}
                  className="corner-frame mt-6 inline-flex items-center gap-2 rounded-[3px] bg-accent px-4 py-2 font-mono text-sm font-medium text-night transition-colors duration-150 hover:bg-accent-strong"
                >
                  <span className="glyph-logo size-4" aria-hidden="true" />
                  Download
                </motion.a>
                {platform.extras.length > 0 && (
                  <div className="mt-4 flex gap-3 text-xs text-muted">
                    {platform.extras.map((extra) => (
                      <a
                        key={extra.label}
                        href={extra.url}
                        onClick={() => trackDownload(`${platform.id}-${extra.label}`)}
                        className="hover:text-ink"
                      >
                        {extra.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
