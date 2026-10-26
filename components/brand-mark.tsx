import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 leading-none whitespace-nowrap",
        className,
      )}
    >
      <Image
        src="/brand/glyph-on-dark.png"
        alt=""
        width={28}
        height={28}
        className="size-7 shrink-0"
        priority
      />
      <span className="font-display text-base leading-none font-normal tracking-[-0.015em]">
        Glyph
      </span>
    </span>
  );
}
