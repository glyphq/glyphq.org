// @ts-expect-error bun:test ships with Bun; @types/bun is not installed here.
import { describe, expect, it } from "bun:test";
import { detectOperatingSystem } from "./use-operating-system";

describe("detectOperatingSystem", () => {
  it("detects Windows from userAgentData platform", () => {
    expect(detectOperatingSystem({ platform: "Windows" })).toBe("windows");
  });

  it("detects Windows from navigator.platform", () => {
    expect(detectOperatingSystem({ platform: "Win32" })).toBe("windows");
  });

  it("detects Windows from the user agent", () => {
    expect(
      detectOperatingSystem({
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      }),
    ).toBe("windows");
  });

  it("detects macOS from userAgentData platform", () => {
    expect(detectOperatingSystem({ platform: "macOS" })).toBe("macos");
  });

  it("detects macOS from navigator.platform", () => {
    expect(detectOperatingSystem({ platform: "MacIntel" })).toBe("macos");
  });

  it("detects macOS from the user agent", () => {
    expect(
      detectOperatingSystem({
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      }),
    ).toBe("macos");
  });

  it("detects Linux from navigator.platform and user agent", () => {
    expect(
      detectOperatingSystem({
        platform: "Linux x86_64",
        userAgent:
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      }),
    ).toBe("linux");
  });

  it("falls back to the user agent when the platform is empty", () => {
    expect(
      detectOperatingSystem({
        platform: "",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      }),
    ).toBe("windows");
  });

  it("returns unknown when no platform information is available", () => {
    expect(detectOperatingSystem({})).toBe("unknown");
    expect(detectOperatingSystem({ platform: "", userAgent: "" })).toBe(
      "unknown",
    );
  });

  it("returns unknown on mobile despite desktop-like platform hints", () => {
    expect(
      detectOperatingSystem({
        platform: "Linux armv8l",
        userAgent:
          "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
      }),
    ).toBe("unknown");

    expect(
      detectOperatingSystem({
        platform: "MacIntel",
        userAgent:
          "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
      }),
    ).toBe("unknown");
  });
});
