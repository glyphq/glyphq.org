import type { ReactNode } from "react";
import { AccentAscii } from "@/components/accent-ascii";
import { cn } from "@/lib/utils";

export function AccentBox({
  children,
  className,
  cellSize = 11,
  intensity = 0.6,
}: {
  children: ReactNode;
  className?: string;
  cellSize?: number;
  intensity?: number;
}) {
  return (
    <span
      className={cn(
        "relative isolate inline-flex items-center overflow-hidden rounded-[0.16em] bg-brand px-[0.12em] py-[0.04em] text-brand-foreground",
        className,
      )}
    >
      <AccentAscii cellSize={cellSize} intensity={intensity} />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
