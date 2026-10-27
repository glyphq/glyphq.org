import type { IconProps } from "@solar-icons/react/lib/types";
import type { ComponentType } from "react";

export function SiteIcon({
  icon: Icon,
  size = 16,
  className,
}: {
  icon: ComponentType<IconProps>;
  size?: number;
  className?: string;
}) {
  return (
    <Icon
      size={size}
      strokeWidth={1.6}
      className={className}
      aria-hidden="true"
    />
  );
}
