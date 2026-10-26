import { cn } from "@/lib/utils";

export function MaskIcon({
  src,
  className,
  interactive = true,
}: {
  src: string;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute bg-[linear-gradient(135deg,var(--brand),transparent_72%)] opacity-25 transition-[opacity,transform] duration-700",
        interactive && "group-hover:scale-105 group-hover:opacity-45",
        className,
      )}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
