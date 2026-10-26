"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { DownloadButton } from "@/components/download-button";
import { MobileNav } from "@/components/mobile-nav";
import { ProductsMenu } from "@/components/products-menu";
import { isActivePath, mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinkClass =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

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
          className="hidden items-center gap-1 xl:flex"
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
