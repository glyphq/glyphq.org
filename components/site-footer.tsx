import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
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
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-x-8">
          <div className="col-span-2 md:col-span-4 md:pr-8">
            <Link
              href="/"
              aria-label="Glyph home"
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BrandMark />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Open-source tools for the Qubic network. A self-custodial desktop
              wallet, developer SDK, relay, and network explorer.
            </p>
          </div>

          <nav
            aria-label="Footer products"
            className="col-span-1 md:col-span-2"
          >
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
            className="col-span-1 md:col-span-3"
          >
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {resource.label}
                    <SiteIcon icon={ArrowRightUpIcon} size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer network" className="col-span-2 md:col-span-3">
            <h3 className="text-sm font-medium">Network</h3>
            <ul className="mt-4 space-y-2.5">
              {networkLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <SiteIcon icon={ArrowRightUpIcon} size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div
        className="pointer-events-none mt-14 flex justify-center overflow-hidden select-none"
        style={{ height: "clamp(5rem, 12vw, 8rem)" }}
        aria-hidden="true"
      >
        <Image
          src="/brand/glyph-on-dark.png"
          alt=""
          width={256}
          height={256}
          loading="eager"
          className="size-[clamp(10rem,24vw,16rem)] shrink-0 opacity-[0.08]"
        />
      </div>
    </footer>
  );
}
