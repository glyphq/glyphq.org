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
        src="/brand/glyph-on-light.png"
        alt=""
        width={28}
        height={28}
        className="size-6 shrink-0 dark:hidden"
        priority
      />
      <Image
        src="/brand/glyph-on-dark.png"
        alt=""
        width={28}
        height={28}
        className="hidden size-6 shrink-0 dark:block"
        priority
      />
      <span className="font-display text-[15px] leading-none font-semibold tracking-[-0.015em]">
        Glyph <span className="text-muted-foreground">Ecosystem</span>
      </span>
    </span>
  );
}
