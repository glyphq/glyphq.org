"use client";

import { AltArrowDownIcon, ArrowRightUpIcon } from "@solar-icons/react/linear";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { DownloadButton } from "@/components/download-button";
import { MobileNav } from "@/components/mobile-nav";
import { SiteIcon } from "@/components/site-icon";
import { isActivePath, mainNav, productLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinkClass =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function ProductsMenu({ icon }: { icon?: (typeof mainNav)[number]["icon"] }) {
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
        aria-controls="products-menu"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          navLinkClass,
          "inline-flex items-center gap-1",
          open && "bg-foreground/5 text-foreground",
        )}
      >
        {icon ? <SiteIcon icon={icon} size={14} /> : null}
        Products
        <SiteIcon
          icon={AltArrowDownIcon}
          size={12}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <div
          id="products-menu"
          className="absolute top-full left-0 z-50 mt-2 w-80 rounded-2xl bg-popover p-2"
        >
          {productLinks.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-2.5 py-2.5 transition-colors hover:bg-foreground/5"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                {product.icon ? (
                  <SiteIcon
                    icon={product.icon}
                    size={14}
                    className="text-muted-foreground"
                  />
                ) : null}
                {product.label}
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                {product.description}
              </span>
            </Link>
          ))}
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-xl px-2.5 py-2.5 text-sm transition-colors hover:bg-foreground/5"
          >
            All products
            <SiteIcon icon={ArrowRightUpIcon} size={14} />
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
          "mx-auto flex w-full items-center gap-4 rounded-full px-3 transition-all duration-300 md:px-4",
          scrolled
            ? "h-14 max-w-5xl bg-background/70 backdrop-blur-xl"
            : "h-16 max-w-[84rem] bg-transparent",
        )}
      >
        <Link
          href="/"
          aria-label="Glyph home"
          className="inline-flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <BrandMark />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {mainNav.map((item) =>
            item.label === "Products" ? (
              <ProductsMenu key={item.href} icon={item.icon} />
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
                {item.icon ? <SiteIcon icon={item.icon} size={14} /> : null}
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <DownloadButton
            size="md"
            iconSize={16}
            className="ml-1 hidden pr-4 sm:inline-flex"
          />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
