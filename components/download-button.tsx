"use client";

import { OsIcon } from "@/components/os-icon";
import type {
  SiteButtonSize,
  SiteButtonVariant,
} from "@/components/site-button";
import { SiteButtonLink } from "@/components/site-button";
import { useOperatingSystem } from "@/lib/use-operating-system";

export function DownloadButton({
  size = "lg",
  variant = "primary",
  className,
  iconSize = 16,
  onClick,
}: {
  size?: SiteButtonSize;
  variant?: SiteButtonVariant;
  className?: string;
  iconSize?: number;
  onClick?: () => void;
}) {
  const { os, label } = useOperatingSystem();

  return (
    <SiteButtonLink
      href="/download"
      size={size}
      variant={variant}
      className={className}
      onClick={onClick}
    >
      <OsIcon os={os} size={iconSize} />
      Download for {label}
    </SiteButtonLink>
  );
}
