"use client";

import { AltArrowDownIcon } from "@solar-icons/react/linear/alt-arrow-down";
import { CloseIcon } from "@solar-icons/react/linear/close";
import { CodeIcon } from "@solar-icons/react/linear/code";
import { DatabaseIcon } from "@solar-icons/react/linear/database";
import { DocumentTextIcon } from "@solar-icons/react/linear/document-text";
import { GalleryIcon } from "@solar-icons/react/linear/gallery";
import { GlobalIcon } from "@solar-icons/react/linear/global";
import { HamburgerMenuIcon } from "@solar-icons/react/linear/hamburger-menu";
import { HandHeartIcon } from "@solar-icons/react/linear/hand-heart";
import { HistoryIcon } from "@solar-icons/react/linear/history";
import { InfoCircleIcon } from "@solar-icons/react/linear/info-circle";
import { ServerIcon } from "@solar-icons/react/linear/server";
import { WalletIcon } from "@solar-icons/react/linear/wallet";
import { WidgetIcon } from "@solar-icons/react/linear/widget";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { products } from "../data/site";

interface Props {
  pathname: string;
}

const links = [
  { label: "Showcase", href: "/showcase", icon: GalleryIcon },
  { label: "Support", href: "/support", icon: HandHeartIcon },
  { label: "Changelog", href: "/changelog", icon: HistoryIcon },
  { label: "About", href: "/about", icon: InfoCircleIcon },
];

const productGroups = [
  { label: "Products", slugs: ["wallet", "explorer"] },
  { label: "Integrations", slugs: ["connect", "contracts", "relay", "api"] },
].map((group) => ({
  ...group,
  items: products.filter((product) => group.slugs.includes(product.slug)),
}));

const productIcons = {
  wallet: WalletIcon,
  explorer: GlobalIcon,
  connect: CodeIcon,
  contracts: DocumentTextIcon,
  relay: ServerIcon,
  api: DatabaseIcon,
} as const;

const spring = { type: "spring", stiffness: 520, damping: 34, mass: 0.7 } as const;

export default function NavMenu({ pathname }: Props) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const transition = reduced ? { duration: 0 } : spring;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
        {/* biome-ignore lint/a11y/noStaticElementInteractions: hover and focus container for the products menu */}
        <div
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
            className={`flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 font-display text-[14px] font-medium transition-colors duration-150 ${
              isActive("/products") ? "text-ink" : "text-ink/60 hover:bg-ink/10 hover:text-ink"
            }`}
          >
            <WidgetIcon size={16} aria-hidden="true" />
            Products
            <motion.span
              animate={{ rotate: productsOpen ? 180 : 0 }}
              transition={transition}
              className="inline-flex"
            >
              <AltArrowDownIcon size={16} aria-hidden="true" />
            </motion.span>
          </motion.button>

          <AnimatePresence initial={false}>
            {productsOpen && (
              <div
                id="products-menu"
                className="absolute left-1/2 top-full z-50 w-[38rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-2"
              >
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97, height: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, y: -8, scale: 0.97, height: 0 }}
                  transition={transition}
                  className="overflow-hidden"
                >
                  <div className="w-full rounded-2xl bg-surface p-2 shadow-2xl shadow-black/50">
                    <div className="grid grid-cols-2 items-start gap-3">
                      {productGroups.map((group) => (
                        <div key={group.label}>
                          <p className="px-2.5 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                            {group.label}
                          </p>
                          <ul className="flex flex-col gap-0.5">
                            {group.items.map((product) => {
                              const ProductIcon =
                                productIcons[product.slug as keyof typeof productIcons] ??
                                WidgetIcon;

                              return (
                                <li key={product.slug}>
                                  <a
                                    href={`/products/${product.slug}`}
                                    onClick={() => setProductsOpen(false)}
                                    className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors duration-150 hover:bg-line"
                                  >
                                    <span className="flex size-[42px] shrink-0 items-center justify-center rounded-xl bg-ink/5">
                                      <ProductIcon
                                        size={24}
                                        className="text-muted transition-colors group-hover:text-ink"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block text-sm font-medium text-ink">
                                        {product.name}
                                      </span>
                                      <span className="mt-0.5 block text-xs leading-5 text-muted">
                                        {product.short}
                                      </span>
                                    </span>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {links.map((item) => {
          const RouteIcon = item.icon;
          return (
            <motion.a
              key={item.href}
              href={item.href}
              whileTap={{ scale: 0.97 }}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 font-display text-[14px] font-medium transition-colors duration-150 ${
                isActive(item.href) ? "text-ink" : "text-ink/60 hover:bg-ink/10 hover:text-ink"
              }`}
            >
              <RouteIcon size={16} aria-hidden="true" />
              {item.label}
            </motion.a>
          );
        })}
      </nav>

      <div className="relative flex items-center gap-2">
        <motion.a
          href="/download"
          whileTap={{ scale: 0.97 }}
          className="hidden items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 font-display text-sm font-medium text-night transition-colors duration-150 hover:bg-accent-strong lg:inline-flex"
        >
          <span className="glyph-logo size-4" aria-hidden="true" />
          Download
        </motion.a>

        <motion.button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          whileTap={{ scale: 0.97 }}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="inline-flex size-9 items-center justify-center rounded-full bg-ink/10 text-ink lg:hidden"
        >
          {mobileOpen ? <CloseIcon size={18} /> : <HamburgerMenuIcon size={18} />}
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
                  className="flex items-center justify-between"
                >
                  <a
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <span className="glyph-logo size-7" aria-hidden="true" />
                    <span className="font-display text-lg font-semibold text-ink">Glyph</span>
                  </a>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="inline-flex size-10 items-center justify-center rounded-full bg-surface text-ink"
                  >
                    <CloseIcon size={20} />
                  </button>
                </motion.div>

                <nav className="mt-12 flex flex-col gap-1" aria-label="Mobile">
                  {[{ label: "Products", href: "/products", icon: WidgetIcon }, ...links].map(
                    (item, index) => {
                      const RouteIcon = item.icon;
                      return (
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
                          className="flex items-center gap-3 rounded-2xl px-4 py-4 font-display text-2xl font-medium text-ink/80 transition-colors duration-150 hover:bg-ink/5 hover:text-ink"
                        >
                          <RouteIcon
                            size={20}
                            aria-hidden="true"
                            className="shrink-0 text-accent-soft"
                          />
                          {item.label}
                        </motion.a>
                      );
                    },
                  )}
                </nav>

                <motion.div
                  className="mt-auto pt-10"
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
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-4 font-display text-base font-medium text-night hover:bg-accent-strong"
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
