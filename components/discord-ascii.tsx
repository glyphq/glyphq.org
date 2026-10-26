"use client";

import GradientASCII from "@/components/gradient-ascii";

const discordColors = ["#111214", "#2b2d80", "#5865f2", "#a9b4ff"];

export function DiscordAscii() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70"
    >
      <GradientASCII
        colors={discordColors}
        shape="horizon"
        characters=" =+xX0S8#@"
        cellSize={16}
        density={0.62}
        glyphOpacity={0.65}
        glow={0.2}
        flicker={0.06}
        softness={0.5}
        scale={1}
        flow={0.5}
        speed={0.3}
        gradientOpacity={0.8}
        grain={0.05}
        variation={4}
        mouseInteraction={false}
        clickEffect="none"
        intro={false}
        lightMode={false}
        dpr={1.5}
      />
    </div>
  );
}
