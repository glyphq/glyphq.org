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
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 font-display text-sm font-medium text-night transition-colors duration-150 hover:bg-white/90"
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
              <>
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.18 }}
                  className="fixed inset-0 z-50 bg-night/70 md:hidden"
                  onClick={() => setMobileOpen(false)}
                />
                <motion.div
                  key="sheet"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menu"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={transition}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={{ top: 0, bottom: 0.5 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.y > 100 || info.velocity.y > 500) setMobileOpen(false);
                  }}
                  className="fixed inset-x-0 bottom-0 z-[60] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-paper shadow-2xl shadow-black/50 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
                >
                  <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-ink/20" />
                  <div className="flex items-center justify-between pb-4">
                    <span className="text-lg font-medium text-ink">Menu</span>
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={() => setMobileOpen(false)}
                      aria-label="Close menu"
                      className="inline-flex size-9 items-center justify-center rounded-full bg-surface text-ink"
                    >
                      <CloseIcon size={18} />
                    </button>
                  </div>
                  <nav className="flex flex-col" aria-label="Mobile">
                    {[{ label: "Products", href: "/products" }, ...links].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl px-3 py-2.5 font-display text-sm text-ink/70 transition-colors duration-150 hover:bg-ink/5 hover:text-ink"
                      >
                        {item.label}
                      </a>
                    ))}
                    <span
                      aria-disabled="true"
                      title="Qubic-focused learning. Coming soon."
                      className="flex cursor-not-allowed items-center rounded-xl px-3 py-2.5 font-display text-sm text-ink/35"
                    >
                      Learn
                    </span>
                  </nav>
                  <a
                    href="/download"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-display text-sm font-medium text-night hover:bg-white/90"
                  >
                    <span className="glyph-logo size-4" aria-hidden="true" />
                    Download
                  </a>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
