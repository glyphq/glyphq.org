"use client";

import { AltArrowDownIcon } from "@solar-icons/react/linear/alt-arrow-down";
import { CloseIcon } from "@solar-icons/react/linear/close";
import { HamburgerMenuIcon } from "@solar-icons/react/linear/hamburger-menu";
import { WidgetIcon } from "@solar-icons/react/linear/widget";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { products } from "../data/site";

interface Props {
  pathname: string;
}

const links = [
  { label: "Showcase", href: "/showcase" },
  { label: "Support", href: "/support" },
  { label: "About", href: "/about" },
];

const spring = { type: "spring", stiffness: 520, damping: 34, mass: 0.7 } as const;

export default function NavMenu({ pathname }: Props) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
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
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
        <div className="relative">
          <motion.button
            type="button"
            onClick={() => setProductsOpen((value) => !value)}
            whileTap={{ scale: 0.97 }}
            aria-expanded={productsOpen}
            className={`flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 font-display text-[14px] font-medium transition-colors duration-150 ${
              isActive("/products")
                ? "text-white"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
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
              <div className="absolute left-1/2 top-full z-50 w-[21rem] -translate-x-1/2 pt-2">
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97, height: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, y: -8, scale: 0.97, height: 0 }}
                  transition={transition}
                  className="overflow-hidden"
                >
                  <div className="w-full rounded-2xl bg-surface p-2 shadow-2xl shadow-black/50">
                    <ul className="flex flex-col">
                      {products.map((product) => (
                        <li key={product.slug}>
                          <a
                            href={`/products/${product.slug}`}
                            onClick={() => setProductsOpen(false)}
                            className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-line"
                          >
                            <span
                              className="glyph-logo mt-0.5 size-5 shrink-0"
                              aria-hidden="true"
                            />
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
                      ))}
                    </ul>
                    <a
                      href="/products"
                      className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2 font-display text-sm font-medium text-ink transition-colors duration-150 hover:bg-line"
                    >
                      <WidgetIcon size={18} className="text-accent-soft" aria-hidden="true" />
                      All products
                    </a>
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
            className={`rounded-full px-3 py-2 font-display text-[14px] font-medium transition-colors duration-150 ${
              isActive(item.href)
                ? "text-white"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </motion.a>
        ))}

        <span
          aria-disabled="true"
          title="Qubic-focused learning. Coming soon."
          className="flex cursor-not-allowed items-center rounded-full px-3 py-2 font-display text-[14px] font-medium text-white/30"
        >
          Learn
        </span>
      </nav>

      <div className="relative flex items-center gap-2">
        <motion.a
          href="/download"
          whileTap={{ scale: 0.97 }}
          className="hidden items-center justify-center gap-2 rounded-full bg-white px-4 py-2 font-display text-sm font-medium text-night transition-colors duration-150 hover:bg-white/90 md:inline-flex"
        >
          <span className="glyph-logo size-4" aria-hidden="true" />
          Download
        </motion.a>

        <motion.button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          whileTap={{ scale: 0.97 }}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white md:hidden"
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
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                initial={reduced ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={
                  reduced ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                }
                className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] md:hidden"
              >
                <div className="flex items-center justify-between">
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
                </div>

                <nav className="mt-12 flex flex-col gap-1" aria-label="Mobile">
                  {[{ label: "Products", href: "/products" }, ...links].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-2xl px-4 py-4 font-display text-2xl font-medium text-ink/80 transition-colors duration-150 hover:bg-white/5 hover:text-ink"
                    >
                      {item.label}
                    </a>
                  ))}
                  <span
                    aria-disabled="true"
                    title="Qubic-focused learning. Coming soon."
                    className="flex cursor-not-allowed items-center rounded-2xl px-4 py-4 font-display text-2xl font-medium text-ink/30"
                  >
                    Learn
                  </span>
                </nav>

                <div className="mt-auto pt-10">
                  <a
                    href="/download"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-4 font-display text-base font-medium text-night hover:bg-white/90"
                  >
                    <span className="glyph-logo size-4" aria-hidden="true" />
                    Download Glyph
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
