import { DownloadIcon } from "@solar-icons/react/linear";
import { SiteIcon } from "@/components/ui/site-icon";
import type { OperatingSystem } from "@/lib/use-operating-system";

function MaskIcon({ src, size }: { src: string; size: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        flexShrink: 0,
        width: size,
        height: size,
        backgroundColor: "currentColor",
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

export function OsIcon({
  os,
  size = 16,
}: {
  os: OperatingSystem;
  size?: number;
}) {
  if (os === "macos") return <MaskIcon src="/os/apple.svg" size={size} />;
  if (os === "windows") return <MaskIcon src="/os/windows.svg" size={size} />;
  if (os === "linux") return <MaskIcon src="/os/linux.svg" size={size} />;
  return <SiteIcon icon={DownloadIcon} size={size} />;
}
