"use client";

import { ArrowUpRight, Download } from "@hugeicons/core-free-icons";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { productLinks } from "@/lib/site";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.from("[data-hero-logo]", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from("[data-hero-word]", {
        opacity: 0,
        yPercent: 110,
        rotateX: -35,
        filter: "blur(10px)",
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.08,
      });

      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.32,
      });
    }, hero);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="site-container flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center py-16 text-center"
    >
      <div data-hero-logo>
        <Image
          src="/brand/glyph-on-light.png"
          alt=""
          width={64}
          height={64}
          className="size-14 dark:hidden"
          priority
        />
        <Image
          src="/brand/glyph-on-dark.png"
          alt=""
          width={64}
          height={64}
          className="hidden size-14 dark:block"
          priority
        />
      </div>

      <h1 className="mt-8 font-display text-[clamp(3.4rem,8.5vw,7.5rem)] leading-[0.86] font-semibold tracking-[-0.07em] text-balance">
        <span data-hero-word className="inline-block">
          Glyph
        </span>{" "}
        <span
          data-hero-word
          className="inline-block rounded-xl bg-brand px-2 text-brand-foreground"
        >
          Ecosystem
        </span>
      </h1>

      <p
        data-hero-fade
        className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
      >
        Open-source tools for Qubic. A self-custodial desktop wallet, developer
        SDK, relay, and network explorer.
      </p>

      <div
        data-hero-fade
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <SiteButtonLink href="/download" size="lg">
          <SiteIcon icon={Download} size={16} />
          Download Glyph
          <SiteIcon icon={ArrowUpRight} size={16} />
        </SiteButtonLink>
        <SiteButtonLink href="/products" variant="secondary" size="lg">
          Explore products
        </SiteButtonLink>
      </div>

      <nav
        data-hero-fade
        aria-label="Ecosystem products"
        className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
      >
        {productLinks.map((product) => (
          <Link
            key={product.href}
            href={product.href}
            className="transition-colors hover:text-foreground"
          >
            {product.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
