"use client";

import { useEffect, useState } from "react";

export type OperatingSystem = "macos" | "windows" | "linux" | "unknown";

type NavigatorWithHints = Navigator & {
  userAgentData?: { platform?: string };
};

export function useOperatingSystem(): {
  os: OperatingSystem;
  label: string;
} {
  const [os, setOs] = useState<OperatingSystem>("unknown");

  useEffect(() => {
    const navigatorWithHints = navigator as NavigatorWithHints;
    const platform = (
      navigatorWithHints.userAgentData?.platform ||
      navigator.platform ||
      navigator.userAgent
    ).toLowerCase();

    if (/mac|iphone|ipad|ipod/.test(platform)) {
      setOs("macos");
    } else if (/win/.test(platform)) {
      setOs("windows");
    } else if (/linux|x11/.test(platform)) {
      setOs("linux");
    }
  }, []);

  if (os === "macos") return { os, label: "macOS" };
  if (os === "windows") return { os, label: "Windows" };
  if (os === "linux") return { os, label: "Linux" };
  return { os, label: "desktop" };
}
