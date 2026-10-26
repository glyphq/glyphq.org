"use client";

import { useTheme } from "next-themes";
import GradientASCII from "@/components/gradient-ascii";
import { asciiDarkColors, asciiLightColors } from "@/lib/ascii-palette";
import { cn } from "@/lib/utils";

const boxDarkColors = [...asciiDarkColors].reverse();

export function AccentAscii({
  cellSize = 10,
  intensity = 1,
  className,
}: {
  cellSize?: number;
  intensity?: number;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === "light";
  const resolvedIntensity = light ? intensity * 0.6 : intensity;

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <GradientASCII
        colors={light ? asciiLightColors : boxDarkColors}
        shape="horizon"
        characters=" =+xX0S8#@"
        cellSize={cellSize}
        density={0.65}
        glyphOpacity={0.8 * resolvedIntensity}
        glow={0.15}
        flicker={0.08}
        softness={0.5}
        scale={1}
        flow={0.5}
        speed={0.3}
        gradientOpacity={0.2 * resolvedIntensity}
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
