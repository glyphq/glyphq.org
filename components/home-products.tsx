"use client";

import { ArrowRightIcon } from "@solar-icons/react/linear";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MaskIcon } from "@/components/mask-icon";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { productLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const productMasks: Record<string, { src: string; icon: string }> = {
  "/products/wallet": {
    src: "/masks/wallet.svg",
    icon: "size-[18rem] lg:size-[23rem]",
  },
  "/products/connect": {
    src: "/masks/code.svg",
    icon: "size-[17rem] lg:size-[21rem]",
  },
  "/products/relay": {
    src: "/masks/link.svg",
    icon: "size-[17rem] lg:size-[21rem]",
  },
  "/products/explorer": {
    src: "/masks/global.svg",
    icon: "size-[17rem] lg:size-[21rem]",
  },
  "/products/api": {
    src: "/masks/code-square.svg",
    icon: "size-[17rem] lg:size-[21rem]",
  },
};

export function HomeProducts() {
  const [active, setActive] = useState(0);
  const entries = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = entries.current.filter(
      (node): node is HTMLElement => node !== null,
    );

    const observer = new IntersectionObserver(
      (records) => {
        const current = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!current) return;

        const index = Number((current.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) setActive(index);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const activeProduct = productLinks[active] ?? productLinks[0];

  return (
    <section
      aria-labelledby="products-heading"
      className="site-container pb-24 md:pb-32"
    >
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <h2
          id="products-heading"
          className="font-display text-4xl leading-[0.96] font-semibold tracking-[-0.06em] text-balance sm:text-5xl lg:text-6xl"
        >
          One wallet.
          <br />
          <span className="text-muted-foreground">A full toolkit.</span>
        </h2>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty lg:pb-1">
          Glyph starts with the wallet, then opens the Qubic network to apps,
          data, and services.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="relative hidden lg:block">
          <div className="sticky top-28">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              {activeProduct?.label}
            </p>
            <div className="relative mt-6 h-[24rem]">
              {productLinks.map((product, index) => {
                const mask = productMasks[product.href];

                return (
                  <MaskIcon
                    key={product.href}
                    src={mask?.src ?? "/masks/code.svg"}
                    interactive={false}
                    className={cn(
                      "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-700",
                      mask?.icon,
                      index === active
                        ? "scale-100 opacity-30"
                        : "scale-95 opacity-0",
                    )}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {productLinks.map((product, index) => {
            const mask = productMasks[product.href];

            return (
              <article
                key={product.href}
                data-index={index}
                ref={(node) => {
                  entries.current[index] = node;
                }}
                className="group flex scroll-mt-28 flex-col justify-center lg:min-h-[20rem]"
              >
                <div className="relative mb-6 flex h-36 items-center justify-center lg:hidden">
                  <MaskIcon
                    src={mask?.src ?? "/masks/code.svg"}
                    interactive={false}
                    className={cn("relative opacity-30", mask?.icon)}
                  />
                </div>

                <h3
                  className={cn(
                    "font-display leading-[0.95] font-semibold tracking-[-0.055em] transition-colors",
                    index === active ? "text-brand" : "text-foreground",
                    index === 0
                      ? "text-[clamp(3rem,6vw,5.5rem)]"
                      : "text-[clamp(2.5rem,5vw,4.5rem)]",
                  )}
                >
                  {product.label}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                  {product.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {index === 0 ? (
                    <SiteButtonLink href="/download" size="md">
                      Download Glyph
                    </SiteButtonLink>
                  ) : null}
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Explore {product.label}
                    <SiteIcon icon={ArrowRightIcon} size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
