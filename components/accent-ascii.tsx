"use client";

import GradientASCII from "@/components/gradient-ascii";
import { cn } from "@/lib/utils";

const colors = ["#0a2f2d", "#116a67", "#3fc9c5", "#ccfcfb"];

export function AccentAscii({
  cellSize = 10,
  intensity = 1,
  className,
}: {
  cellSize?: number;
  intensity?: number;
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <GradientASCII
        colors={colors}
        shape="horizon"
        characters=" =+xX0S8#@"
        cellSize={cellSize}
        density={0.65}
        glyphOpacity={0.8 * intensity}
        glow={0.15}
        flicker={0.08}
        softness={0.5}
        scale={1}
        flow={0.5}
        speed={0.3}
        gradientOpacity={0.2 * intensity}
        grain={0.04}
        variation={3}
        mouseInteraction={false}
        clickEffect="none"
        intro={false}
        lightMode
        dpr={1.5}
      />
    </div>
  );
}
