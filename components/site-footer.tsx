import { ArrowUpRight } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { productLinks, resourceLinks, siteConfig } from "@/lib/site";

const networkLinks = [
  { label: "Qubic", href: "https://qubic.org" },
  { label: "Qubic Explorer", href: "https://explorer.qubic.org" },
  { label: "Developer docs", href: siteConfig.links.docs },
];

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="site-container pt-14 md:pt-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-10 text-brand-foreground md:px-12 md:py-14">
          <div className="relative">
            <h2 className="max-w-3xl font-display text-4xl leading-[0.98] tracking-[-0.055em] text-balance sm:text-5xl md:text-6xl">
              Your Qubic.
              <br />
              Your keys.
              <br />
              <span className="text-brand-foreground/50">Your call.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-brand-foreground/70 text-pretty sm:text-base">
              A self-custodial desktop wallet for Windows, macOS, and Linux.
              Open-source tools for the rest of the Qubic ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SiteButtonLink
                href="/download"
                size="lg"
                className="bg-brand-foreground text-brand hover:bg-brand-foreground/90"
              >
                Download Glyph
                <SiteIcon icon={ArrowUpRight} size={16} />
              </SiteButtonLink>
              <SiteButtonLink
                href={siteConfig.links.docs}
                external
                variant="outline"
                size="lg"
                className="text-brand-foreground hover:bg-brand-foreground/10"
              >
                Read the docs
              </SiteButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="site-container mt-14">
        <div className="grid gap-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="rounded-2xl bg-card p-6">
            <Link
              href="/"
              aria-label="Glyph Ecosystem home"
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BrandMark />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Open-source tools for the Qubic network. A self-custodial desktop
              wallet, developer SDK, relay, and network explorer.
            </p>
            <p className="mt-5 text-xs text-muted-foreground">
              Independent community project
            </p>
          </div>

          <nav aria-label="Footer products" className="rounded-2xl bg-card p-6">
            <h3 className="text-sm font-medium">Products</h3>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((product) => (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            aria-label="Footer resources"
            className="rounded-2xl bg-card p-6"
          >
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {resource.label}
                    <SiteIcon icon={ArrowUpRight} size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer network" className="rounded-2xl bg-card p-6">
            <h3 className="text-sm font-medium">Network</h3>
            <ul className="mt-4 space-y-2.5">
              {networkLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <SiteIcon icon={ArrowUpRight} size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="site-container overflow-hidden pt-16">
        <p
          className="font-display text-[clamp(4rem,17vw,15rem)] leading-[0.72] font-semibold tracking-[-0.09em] text-foreground/[0.06] select-none"
          aria-hidden="true"
        >
          GLYPH
        </p>
      </div>

      <div className="site-container flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Glyph. Independent community project.</p>
        <p>
          Wallet{" "}
          <a
            href={siteConfig.links.wallet}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground"
          >
            source available
          </a>
          . Connect is{" "}
          <a
            href={siteConfig.links.connect}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground"
          >
            MIT licensed
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
