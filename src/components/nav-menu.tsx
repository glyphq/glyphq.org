"use client";

import { Bars, ChevronDown, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { products } from "../data/site";
import { getCachedPlatform } from "../lib/platform";
import type { PlatformId } from "../lib/releases";

interface Props {
  pathname: string;
}

const links = [
  { label: "Showcase", href: "/showcase" },
  { label: "Support", href: "/support" },
  { label: "Changelog", href: "/changelog" },
];

const productGroups = [
  { label: "Products", slugs: ["wallet", "explorer", "relay", "api"] },
  { label: "Integrations", slugs: ["connect", "contracts"] },
].map((group) => ({
  ...group,
  items: products.filter((product) => group.slugs.includes(product.slug)),
}));

const platformLabels: Record<PlatformId, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
};

const spring = { type: "spring", stiffness: 520, damping: 34, mass: 0.7 } as const;

export default function NavMenu({ pathname }: Props) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platform, setPlatform] = useState<PlatformId | null>(null);
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const transition = reduced ? { duration: 0 } : spring;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const downloadLabel = platform ? `Download for ${platformLabels[platform]}` : "Download";

  useEffect(() => {
    setPlatform(getCachedPlatform());
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setProductsOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!productsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!productsRef.current?.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [productsOpen]);

  useEffect(() => {
    const close = () => {
      setMobileOpen(false);
      setProductsOpen(false);
    };
    document.addEventListener("astro:page-load", close);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (desktop.matches) close();
    };
    onChange();
    desktop.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      document.removeEventListener("astro:page-load", close);
      desktop.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const background = [
      document.querySelector("header"),
      document.querySelector("main"),
      document.querySelector("footer"),
      document.querySelector('a[href="#main"]'),
    ].filter((element): element is HTMLElement => element instanceof HTMLElement);
    background.forEach((element) => {
      element.setAttribute("inert", "");
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const menu = document.getElementById("mobile-menu");
      if (!menu) return;
      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      background.forEach((element) => {
        element.removeAttribute("inert");
      });
      document.removeEventListener("keydown", onKey);
      menuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
        {/* biome-ignore lint/a11y/noStaticElementInteractions: hover and focus container for the products menu */}
        <div
          ref={productsRef}
          className="relative"
          onMouseEnter={() => setProductsOpen(true)}
          onMouseLeave={() => setProductsOpen(false)}
          onFocus={() => setProductsOpen(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setProductsOpen(false);
            }
          }}
        >
          <motion.button
            type="button"
            onClick={() => setProductsOpen(true)}
            whileTap={{ scale: 0.97 }}
            aria-expanded={productsOpen}
            aria-controls="products-menu"
            aria-haspopup="true"
            aria-current={isActive("/products") ? "page" : undefined}
            className={`relative flex cursor-pointer items-center gap-2 rounded-[4px] px-3 py-2 font-mono text-[13px] tracking-[0.01em] transition-colors duration-150 ${
              isActive("/products") ? "text-ink" : "text-ink/60 hover:bg-ink/10 hover:text-ink"
            }`}
          >
            Products
            <motion.span
              animate={{ rotate: productsOpen ? 180 : 0 }}
              transition={transition}
              className="inline-flex"
            >
              <ChevronDown width={16} height={16} aria-hidden="true" />
            </motion.span>
            {isActive("/products") && (
              <span
                className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-ink"
                aria-hidden="true"
              />
            )}
          </motion.button>

          <AnimatePresence initial={false}>
            {productsOpen && (
              <div
                id="products-menu"
                className="absolute left-1/2 top-full z-50 w-[38rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-5"
              >
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97, height: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, y: -8, scale: 0.97, height: 0 }}
                  transition={transition}
                  className="overflow-hidden"
                >
                  <div className="corner-frame corner-frame-card w-full rounded-[6px] bg-surface p-2.5 shadow-2xl shadow-black/50">
                    <div className="grid grid-cols-2 items-start gap-3">
                      {productGroups.map((group, groupIndex) => (
                        <div
                          key={group.label}
                          className={groupIndex > 0 ? "border-l border-line pl-3" : "pr-3"}
                        >
                          <p className="px-3 pb-2 pt-1 font-mono text-[11px] tracking-[0.04em] text-faint">
                            {group.label}
                          </p>
                          <ul className="flex flex-col gap-1">
                            {group.items.map((product) => (
                              <li key={product.slug}>
                                <a
                                  href={`/products/${product.slug}`}
                                  onClick={() => setProductsOpen(false)}
                                  className="group block rounded-[3px] px-3 py-2.5 transition-colors duration-150 hover:bg-line"
                                >
                                  <span className="block font-mono text-[15px] font-medium text-ink">
                                    {product.name}
                                  </span>
                                  <span className="mt-1 block text-[13px] leading-5 text-muted">
                                    {product.short}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-line px-3 pt-3">
                      <a
                        href="/products"
                        onClick={() => setProductsOpen(false)}
                        className="font-mono text-[12px] text-muted transition-colors hover:text-ink"
                      >
                        All products
                      </a>
                      <span className="font-mono text-[11px] text-faint">
                        {products.length} tools
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {links.map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            whileTap={{ scale: 0.97 }}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={`relative inline-flex items-center gap-2 rounded-[4px] px-3 py-2 font-mono text-[13px] tracking-[0.01em] transition-colors duration-150 ${
              isActive(item.href) ? "text-ink" : "text-ink/60 hover:bg-ink/10 hover:text-ink"
            }`}
          >
            {item.label}
            {item.href === "/support" && (
              <span
                data-support-progress
                hidden
                className="rounded-full bg-ink/5 px-1.5 py-0.5 font-mono text-[9px] font-normal leading-none text-ink/40"
              />
            )}
            {isActive(item.href) && (
              <span
                className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-ink"
                aria-hidden="true"
              />
            )}
          </motion.a>
        ))}
      </nav>

      <div className="relative flex items-center gap-2">
        <motion.a
          href="/download"
          whileTap={{ scale: 0.97 }}
          className="corner-frame hidden w-[13.5rem] items-center justify-center gap-2 rounded-[3px] bg-accent px-4 py-2 font-mono text-[13px] font-medium text-night transition-colors duration-150 hover:bg-accent-strong lg:inline-flex"
        >
          <span className="glyph-logo size-4" aria-hidden="true" />
          {downloadLabel}
        </motion.a>

        <motion.button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          whileTap={{ scale: 0.97 }}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="corner-frame inline-flex size-9 items-center justify-center rounded-[3px] bg-ink/10 text-ink lg:hidden"
        >
          {mobileOpen ? (
            <Xmark width={18} height={18} aria-hidden="true" />
          ) : (
            <Bars width={18} height={18} aria-hidden="true" />
          )}
        </motion.button>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="menu"
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                initial={reduced ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={
                  reduced ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                }
                className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] lg:hidden"
              >
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduced ? { duration: 0 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="flex items-center justify-between border-b border-line pb-4"
                >
                  <a
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <span className="glyph-logo size-7" aria-hidden="true" />
                    <span className="whitespace-nowrap font-display text-lg font-semibold text-ink">
                      Glyph
                    </span>
                  </a>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="corner-frame inline-flex size-10 items-center justify-center rounded-[3px] bg-surface text-ink"
                  >
                    <Xmark width={20} height={20} aria-hidden="true" />
                  </button>
                </motion.div>

                <nav
                  className="mt-4 flex flex-col divide-y divide-line border-y border-line"
                  aria-label="Mobile"
                >
                  {[{ label: "Products", href: "/products" }, ...links].map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      initial={reduced ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : {
                              duration: 0.24,
                              delay: 0.08 + index * 0.04,
                              ease: [0.22, 1, 0.36, 1],
                            }
                      }
                      className={`flex items-center justify-between gap-3 px-4 py-4 font-mono text-lg transition-colors duration-150 ${
                        isActive(item.href)
                          ? "bg-ink/5 text-ink"
                          : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                      }`}
                    >
                      {item.label}
                      {item.href === "/support" && (
                        <span
                          data-support-progress
                          hidden
                          className="rounded-full bg-ink/5 px-1.5 py-0.5 font-mono text-[9px] font-normal leading-none text-ink/40"
                        />
                      )}
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  className="mt-auto border-t border-line pt-6"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          duration: 0.26,
                          delay: 0.08 + (links.length + 1) * 0.04,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                >
                  <a
                    href="/download"
                    onClick={() => setMobileOpen(false)}
                    className="corner-frame flex w-full items-center justify-center gap-2 rounded-[3px] bg-accent px-4 py-4 font-mono text-sm font-medium text-night hover:bg-accent-strong"
                  >
                    <span className="glyph-logo size-4" aria-hidden="true" />
                    Download Glyph
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
