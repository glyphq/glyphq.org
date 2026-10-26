import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ButtonAscii } from "@/components/button-ascii";
import { cn } from "@/lib/utils";

export type SiteButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type SiteButtonSize = "sm" | "md" | "lg" | "icon" | "icon-sm";

type Variant = SiteButtonVariant;
type Size = SiteButtonSize;

const base =
  "relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0";

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
  children,
  ...props
}: SiteButtonProps & ComponentProps<"button">) {
  return (
    <button
      className={siteButtonClasses({ variant, size, className })}
      {...props}
    >
      {(variant === undefined || variant === "primary") && <ButtonAscii />}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}

export function SiteButtonLink({
  className,
  variant,
  size,
  href,
  external,
  children,
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
      >
        {(variant === undefined || variant === "primary") && <ButtonAscii />}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {(variant === undefined || variant === "primary") && <ButtonAscii />}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}
