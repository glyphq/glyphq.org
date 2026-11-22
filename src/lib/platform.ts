import { isMacOs, isMobile, isTablet, isWindows, osName } from "react-device-detect";
import type { PlatformId } from "./releases";

export const detectPlatform = (): PlatformId | null => {
  if (isMobile || isTablet) return null;
  if (isWindows) return "windows";
  if (isMacOs) return "macos";
  if (/linux/i.test(osName)) return "linux";
  return null;
};
