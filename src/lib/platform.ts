import type { PlatformId } from "./releases";

type NavigatorWithPlatform = Navigator & {
  userAgentData?: {
    platform?: string;
  };
};

const PLATFORM_STORAGE_KEY = "glyph-platform-v2";

const isPlatformId = (value: string | null): value is PlatformId =>
  value === "windows" || value === "macos" || value === "linux";

export const detectPlatform = (): PlatformId | null => {
  if (typeof navigator === "undefined") return null;

  const nav = navigator as NavigatorWithPlatform;
  const platform = nav.userAgentData?.platform ?? nav.platform ?? "";
  const userAgent = nav.userAgent;
  const isTouchMac = /mac/i.test(platform) && nav.maxTouchPoints > 1;

  if (
    isTouchMac ||
    /android|iphone|ipad|ipod|iemobile|mobile/i.test(userAgent) ||
    /android|iphone|ipad|ipod/i.test(platform)
  ) {
    return null;
  }

  if (/win/i.test(platform)) return "windows";
  if (/mac/i.test(platform)) return "macos";
  if (/linux/i.test(platform)) return "linux";
  if (/windows/i.test(userAgent)) return "windows";
  if (/mac os x/i.test(userAgent)) return "macos";
  if (/linux/i.test(userAgent)) return "linux";
  return null;
};

export const getCachedPlatform = (): PlatformId | null => {
  if (typeof window === "undefined") return null;

  try {
    const cached = window.localStorage.getItem(PLATFORM_STORAGE_KEY);
    if (isPlatformId(cached)) return cached;
  } catch {
    // Storage can be unavailable in privacy-restricted contexts.
  }

  const detected = detectPlatform();
  if (detected) {
    try {
      window.localStorage.setItem(PLATFORM_STORAGE_KEY, detected);
    } catch {
      // Detection still works for this page when storage is unavailable.
    }
  }
  return detected;
};
