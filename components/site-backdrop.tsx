"use client";

import { useTheme } from "next-themes";
import GradientASCII from "@/components/gradient-ascii";

const darkColors = ["#123f3e", "#35b8b3", "#a8fbf8", "#eafffe"];
const lightColors = ["#0a2f2d", "#116a67", "#3fc9c5", "#ccfcfb"];

export function SiteBackdrop() {
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === "light";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[38svh] max-h-[32rem] overflow-hidden md:h-[46svh]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--brand) 22%, transparent), transparent 68%)",
        }}
      />
      <div className="absolute inset-0">
        <GradientASCII
          colors={light ? lightColors : darkColors}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.7}
          glyphOpacity={0.8}
          glow={0.4}
          flicker={0.1}
          softness={0.5}
          scale={1}
          flow={0.5}
          speed={0.35}
          gradientOpacity={0.9}
          grain={0.08}
          variation={2}
          mouseInteraction={false}
          clickEffect="none"
          intro
          lightMode={light}
          dpr={1.5}
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/90 via-background/45 to-transparent md:h-28" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
