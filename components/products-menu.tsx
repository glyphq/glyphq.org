"use client";

import { AltArrowDownIcon, ArrowRightIcon } from "@solar-icons/react/linear";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SiteIcon } from "@/components/site-icon";
import { productLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const productMasks = {
  "/products/wallet": "/masks/products/wallet.svg",
  "/products/connect": "/masks/products/connect.svg",
  "/products/relay": "/masks/products/relay.svg",
  "/products/explorer": "/masks/products/explorer.svg",
  "/products/api": "/masks/products/api.svg",
} as const;

const productMaskColors = {
  "/products/wallet": "#ccfcfb",
  "/products/connect": "#9fc8ff",
  "/products/relay": "#c8b2ff",
  "/products/explorer": "#a4edc1",
  "/products/api": "#ffc69e",
} as const;

const triggerClass =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const easeOut = [0.22, 1, 0.36, 1] as const;

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -4, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.16, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.99,
    transition: { duration: 0.1, ease: [0.4, 0, 1, 1] },
  },
};

function ProductTile({
  product,
  featured,
  span,
  onSelect,
}: {
  product: (typeof productLinks)[number];
  featured?: boolean;
  span?: string;
  onSelect: () => void;
}) {
  const mask = productMasks[product.href as keyof typeof productMasks];
  const maskColor =
    productMaskColors[product.href as keyof typeof productMaskColors] ??
    "#ccfcfb";

  return (
    <Link
      href={product.href}
      onClick={onSelect}
      className={cn(
        "group/tile relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-foreground/[0.04] p-4 transition-colors duration-300 hover:bg-foreground/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        featured
          ? "col-span-12 min-h-[13rem] bg-foreground/[0.05] md:col-span-7 md:row-span-2"
          : cn("col-span-12 min-h-[6.5rem]", span ?? "md:col-span-5"),
      )}
    >
      {mask ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute opacity-[0.09]",
            featured
              ? "-top-8 -right-6 h-56 w-56"
              : "-top-7 -right-5 h-32 w-32",
          )}
          style={{
            backgroundColor: maskColor,
            maskImage: `url(${mask})`,
            WebkitMaskImage: `url(${mask})`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      ) : null}
      <div className="flex items-start justify-end">
        <SiteIcon
          icon={ArrowRightIcon}
          size={featured ? 18 : 14}
          className="text-muted-foreground transition-colors group-hover/tile:text-foreground"
        />
      </div>
      <div className={cn("mt-auto", featured ? "pt-6" : "pt-4")}>
        <span
          className={cn(
            "block font-display font-medium tracking-[-0.03em]",
            featured ? "text-2xl md:text-3xl" : "text-lg",
          )}
        >
          {product.label}
        </span>
        <span className="mt-1.5 block max-w-[18rem] text-xs leading-relaxed text-muted-foreground text-pretty">
          {product.description}
        </span>
      </div>
    </Link>
  );
}

export function ProductsMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const openMenu = () => {
    clearClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

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

  const [wallet, ...tools] = productLinks;
  const isActive = pathname.startsWith("/products");

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") openMenu();
      }}
      onPointerLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          scheduleClose();
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="products-menu"
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          triggerClass,
          open && "bg-foreground/5 text-foreground",
          isActive && "bg-foreground/5",
        )}
      >
        Products
        <SiteIcon
          icon={AltArrowDownIcon}
          size={12}
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {open ? (
            <motion.div
              key="products-menu"
              id="products-menu"
              variants={menuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="absolute top-full left-0 z-50 mt-2 w-[min(52rem,calc(100vw-2rem))] origin-top-left rounded-[1.75rem] bg-popover p-2 shadow-2xl shadow-black/40"
            >
              <div className="grid grid-cols-12 gap-2">
                {wallet ? (
                  <ProductTile
                    product={wallet}
                    featured
                    onSelect={() => setOpen(false)}
                  />
                ) : null}
                {tools.map((tool, index) => (
                  <ProductTile
                    key={tool.href}
                    product={tool}
                    span={index < 2 ? "md:col-span-5" : "md:col-span-6"}
                    onSelect={() => setOpen(false)}
                  />
                ))}
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-3 px-3 pt-3 pb-1">
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-brand"
                >
                  All products
                  <SiteIcon icon={ArrowRightIcon} size={14} />
                </Link>
                <Link
                  href="/download"
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Download Glyph
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
