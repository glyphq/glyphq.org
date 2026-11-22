"use client";

import { SiApple, SiLinux } from "@icons-pack/react-simple-icons";
import { MonitorIcon } from "@solar-icons/react/linear/monitor";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { trackDownload } from "../lib/analytics";
import { detectPlatform } from "../lib/platform";
import type { DownloadPlatform } from "../lib/releases";

interface Props {
  platforms: DownloadPlatform[];
}

const icons = {
  windows: MonitorIcon,
  macos: SiApple,
  linux: SiLinux,
};

export default function DownloadPicker({ platforms }: Props) {
  const [detected, setDetected] = useState<ReturnType<typeof detectPlatform>>(null);

  useEffect(() => {
    setDetected(detectPlatform());
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
              className="relative overflow-hidden rounded-2xl bg-surface p-5 md:p-6"
            >
              <span className="hairline-mask" aria-hidden="true" />
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <Icon size={28} color="currentColor" aria-hidden="true" />
                  <h3 className="text-xl font-medium text-ink">{platform.name}</h3>
                  {isActive && (
                    <span className="rounded-full bg-paper px-2 py-0.5 font-display text-[10px] uppercase tracking-[0.12em] text-accent-soft">
                      Detected
                    </span>
                  )}
                </div>
                <p className="mt-3 text-base text-muted">{platform.detail}</p>
                <motion.a
                  href={platform.url}
                  onClick={() => trackDownload(platform.id)}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-display text-sm font-semibold text-night transition-colors duration-150 hover:bg-accent-strong"
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
