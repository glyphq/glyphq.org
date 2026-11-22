"use client";

import { SiApple, SiLinux } from "@icons-pack/react-simple-icons";
import { MonitorIcon } from "@solar-icons/react/linear/monitor";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
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
      <div className="-mx-4 mt-0 grid divide-y divide-line border-y border-line md:-mx-8 md:grid-cols-3 md:divide-x md:divide-y-0">
        {platforms.map((platform) => {
          const Icon = icons[platform.id];
          const isActive = platform.id === detected;
          return (
            <div key={platform.id} className={`p-8 md:p-10 ${isActive ? "bg-surface" : ""}`}>
              <div className="flex items-center justify-between">
                <Icon size={28} color="currentColor" aria-hidden="true" />
                {isActive && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-soft">
                    Detected
                  </span>
                )}
              </div>
              <h3 className="mt-6 text-xl font-medium text-ink">{platform.name}</h3>
              <p className="mt-2 text-base text-muted">{platform.detail}</p>
              <motion.a
                href={platform.url}
                whileTap={{ scale: 0.97 }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-line px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:bg-[#2a2a2a]"
              >
                <img
                  src="/brand/glyph-on-dark.png"
                  alt=""
                  width="16"
                  height="16"
                  className="size-4"
                />
                Download
              </motion.a>
              {platform.extras.length > 0 && (
                <div className="mt-4 flex gap-3 text-xs text-muted">
                  {platform.extras.map((extra) => (
                    <a key={extra.label} href={extra.url} className="hover:text-ink">
                      {extra.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
