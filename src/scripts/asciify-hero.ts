import { type BackgroundHandle, background, drift } from "asciify-engine/kit";

let handle: BackgroundHandle | null = null;

const destroy = () => {
  handle?.destroy();
  handle = null;
};

const mount = () => {
  destroy();

  const host = document.querySelector<HTMLElement>("[data-asciify-hero]");
  if (!host) return;

  const clear = host.querySelector<HTMLElement>("[data-asciify-clear]");
  let clearRects: { left: number; top: number; width: number; height: number }[] = [];
  let clearKey = "";

  const measureClear = () => {
    if (!clear) return clearRects;

    const hostRect = host.getBoundingClientRect();
    const copyRect = clear.getBoundingClientRect();
    const key = [
      window.scrollY,
      window.innerWidth,
      hostRect.width,
      hostRect.height,
      copyRect.width,
      copyRect.height,
      document.fonts.status,
    ].join(":");

    if (key === clearKey) return clearRects;

    const rects: typeof clearRects = [];
    for (const element of clear.querySelectorAll("h1, p")) {
      const range = document.createRange();
      range.selectNodeContents(element);
      for (const rect of range.getClientRects()) {
        if (rect.width > 0 && rect.height > 0) {
          rects.push({
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          });
        }
      }
    }

    clearRects = rects;
    clearKey = key;
    return clearRects;
  };

  try {
    handle = background(host, {
      preset: drift,
      palette: "#8f8d86",
      cellSize: 11,
      speed: 1,
      opacity: 0.75,
      mark: "glyph",
      cursor: "trail",
      dither: 0,
      look: { scene: "flow" },
      lazy: false,
      ...(clear
        ? {
            clear: measureClear,
            clearPadding: 10,
            clearSoftness: 26,
            clearStrength: 0.9,
          }
        : {}),
    });
  } catch {
    handle = null;
  }
};

document.addEventListener("astro:before-swap", destroy);
document.addEventListener("astro:page-load", mount);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount, { once: true });
} else {
  mount();
}
