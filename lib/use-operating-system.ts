"use client";

import { useEffect, useState } from "react";

export type OperatingSystem = "macos" | "windows" | "linux" | "unknown";

type NavigatorWithHints = Navigator & {
  userAgentData?: { platform?: string };
};

export function detectOperatingSystem(input: {
  platform?: string;
  userAgent?: string;
}): OperatingSystem {
  const combined = [input.platform, input.userAgent]
    .filter((value): value is string => Boolean(value))
    .join(" ")
    .toLowerCase();

  if (/android|iphone|ipad|ipod|mobile/.test(combined)) return "unknown";
  if (/mac|macintosh/.test(combined)) return "macos";
  if (/win/.test(combined)) return "windows";
  if (/linux|x11/.test(combined)) return "linux";
  return "unknown";
}

export function useOperatingSystem(): {
  os: OperatingSystem;
  label: string;
} {
  const [os, setOs] = useState<OperatingSystem>("unknown");

  useEffect(() => {
    const navigatorWithHints = navigator as NavigatorWithHints;
    const platform =
      navigatorWithHints.userAgentData?.platform || navigator.platform || "";

    setOs(
      detectOperatingSystem({
        platform,
        userAgent: navigator.userAgent,
      }),
    );
  }, []);

  if (os === "macos") return { os, label: "macOS" };
  if (os === "windows") return { os, label: "Windows" };
  if (os === "linux") return { os, label: "Linux" };
  return { os, label: "desktop" };
}
