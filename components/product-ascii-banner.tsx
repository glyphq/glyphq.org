"use client";

import GradientASCII from "@/components/gradient-ascii";
import { asciiDarkColors } from "@/lib/ascii-palette";
import { cn } from "@/lib/utils";

const palettes: Record<string, readonly string[]> = {
  "/products/wallet": ["#123f3e", "#35b8b3", "#a8fbf8"],
  "/products/connect": ["#0c1f38", "#2a5f9e", "#9fc8ff"],
  "/products/relay": ["#23123c", "#6a4ab8", "#c8b2ff"],
  "/products/explorer": ["#0d2b1e", "#2b8a5a", "#a4edc1"],
  "/products/api": ["#321c11", "#b56436", "#ffc69e"],
};

export function ProductAsciiBanner({
  href,
  title,
  className,
  titleClassName,
}: {
  href: string;
  title: string;
  className?: string;
  titleClassName?: string;
}) {
  const colors = palettes[href] ?? asciiDarkColors;
  const accent = colors[colors.length - 1];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-44",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 48%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 48%, transparent 100%)",
        }}
      >
        <GradientASCII
          colors={[...colors]}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={10}
          density={0.6}
          glyphOpacity={0.6}
          glow={0.2}
          flicker={0.05}
          softness={0.5}
          scale={1}
          flow={0.5}
          speed={0.25}
          gradientOpacity={0.7}
          grain={0.05}
          variation={2}
          mouseInteraction={false}
          clickEffect="none"
          intro={false}
          lightMode={false}
          dpr={1.5}
        />
      </div>
      <div className="absolute inset-x-0 top-8 z-10 px-6 text-center">
        <h3
          className={cn(
            "font-display text-3xl leading-tight font-medium tracking-[-0.04em] text-balance md:text-4xl",
            titleClassName,
          )}
          style={{ color: accent }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
