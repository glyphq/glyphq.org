"use client";

import {
  ArrowRightUpIcon,
  CloseIcon,
  HamburgerMenuIcon,
} from "@solar-icons/react/linear";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { DownloadButton } from "@/components/download-button";
import { siteButtonClasses } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { mainNav, productLinks, resourceLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className={cn(
          siteButtonClasses({ variant: "ghost", size: "icon" }),
          "lg:hidden",
        )}
      >
        <SiteIcon icon={HamburgerMenuIcon} size={18} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-background p-0 text-foreground outline-none"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between px-5">
            <BrandMark />
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className={siteButtonClasses({ variant: "ghost", size: "icon" })}
            >
              <SiteIcon icon={CloseIcon} size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <nav aria-label="Mobile navigation" className="mt-4 flex flex-col">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between py-3 font-display text-3xl tracking-[-0.05em] transition-colors hover:text-brand"
                >
                  <span className="flex items-center gap-3">
                    {item.icon ? <SiteIcon icon={item.icon} size={20} /> : null}
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-card p-4">
                <h3 className="text-sm font-medium">Products</h3>
                <div className="mt-3 flex flex-col gap-2">
                  {productLinks.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      onClick={close}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {product.icon ? (
                        <SiteIcon icon={product.icon} size={14} />
                      ) : null}
                      {product.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-card p-4">
                <h3 className="text-sm font-medium">Resources</h3>
                <div className="mt-3 flex flex-col gap-2">
                  {resourceLinks.map((resource) => (
                    <a
                      key={resource.href}
                      href={resource.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={close}
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {resource.label}
                      <SiteIcon icon={ArrowRightUpIcon} size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 p-5">
            <DownloadButton size="lg" className="w-full" onClick={close} />
            <p className="mt-3 text-center font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              macOS / Windows / Linux
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
