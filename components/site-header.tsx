"use client";

import { ArrowUpRight, ChevronDown } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { MobileNav } from "@/components/mobile-nav";
import { SiteButtonLink } from "@/components/site-button";
import { SiteCommand } from "@/components/site-command";
import { SiteIcon } from "@/components/site-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { isActivePath, mainNav, productLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinkClass =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          navLinkClass,
          "inline-flex items-center gap-1",
          open && "bg-foreground/5 text-foreground",
        )}
      >
        Products
        <SiteIcon
          icon={ChevronDown}
          size={12}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute top-full left-0 z-50 mt-2 w-80 rounded-2xl bg-popover p-2"
        >
          {productLinks.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-2.5 py-2.5 transition-colors hover:bg-foreground/5"
            >
              <span className="block text-sm font-medium">{product.label}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                {product.description}
              </span>
            </Link>
          ))}
          <Link
            href="/products"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-xl px-2.5 py-2.5 text-sm transition-colors hover:bg-foreground/5"
          >
            All products
            <SiteIcon icon={ArrowUpRight} size={14} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={cn(
          "relative mx-auto grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-full px-3 transition-all duration-300 md:px-4",
          scrolled
            ? "h-12 max-w-5xl bg-background/70 backdrop-blur-xl"
            : "h-14 max-w-[84rem] bg-transparent",
        )}
      >
        <Link
          href="/"
          aria-label="Glyph Ecosystem home"
          className="relative z-10 justify-self-start rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <BrandMark />
        </Link>

        <nav
          aria-label="Main navigation"
          className="relative z-10 hidden items-center gap-0.5 justify-self-center lg:flex"
        >
          {mainNav.map((item) =>
            item.label === "Products" ? (
              <ProductsMenu key={item.href} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  isActivePath(pathname, item.href) ? "page" : undefined
                }
                className={cn(
                  navLinkClass,
                  isActivePath(pathname, item.href) &&
                    "bg-foreground/5 text-foreground",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="relative z-10 flex items-center gap-0.5 justify-self-end">
          <SiteCommand />
          <ThemeToggle />
          <SiteButtonLink
            href="/download"
            size="sm"
            className="ml-1 hidden gap-1.5 pr-3 sm:inline-flex"
          >
            Download
            <SiteIcon icon={ArrowUpRight} size={14} />
          </SiteButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
