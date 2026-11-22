import type { AsciiRevealController, Duration, PresetName } from "ascii-reveal/core";
import { createAsciiReveal } from "ascii-reveal/core";

const controllers = new Set<AsciiRevealController>();

const init = () => {
  for (const root of document.querySelectorAll<HTMLElement>("[data-ascii-reveal]")) {
    if (root.dataset.asciiReady) continue;
    root.dataset.asciiReady = "true";
    const controller = createAsciiReveal(root, {
      preset: (root.dataset.revealPreset ?? "decode") as PresetName,
      duration: (root.dataset.revealDuration ?? "fast") as Duration,
      lazy: true,
      fallback: true,
    });
    controllers.add(controller);
    void controller.reveal();
  }
};

document.addEventListener("astro:page-load", init);
document.addEventListener("astro:before-swap", () => {
  for (const controller of controllers) controller.destroy();
  controllers.clear();
});

init();
