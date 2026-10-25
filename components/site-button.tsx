import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg" | "icon" | "icon-sm";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-brand-foreground hover:bg-brand/85",
  secondary: "bg-foreground/8 text-foreground hover:bg-foreground/14",
  outline: "bg-transparent text-foreground hover:bg-foreground/5",
  ghost: "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "size-9",
  "icon-sm": "size-8",
};

export function siteButtonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type SiteButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function SiteButton({
  className,
  variant,
  size,
  ...props
}: SiteButtonProps & ComponentProps<"button">) {
  return (
    <button
      className={siteButtonClasses({ variant, size, className })}
      {...props}
    />
  );
}

export function SiteButtonLink({
  className,
  variant,
  size,
  href,
  external,
  ...props
}: SiteButtonProps &
  Omit<ComponentProps<typeof Link>, "href"> & {
    href: string;
    external?: boolean;
  }) {
  const classes = siteButtonClasses({ variant, size, className });

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        {...props}
      />
    );
  }

  return <Link href={href} className={classes} {...props} />;
}
