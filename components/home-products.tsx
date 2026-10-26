import { ArrowRightIcon } from "@solar-icons/react/linear";
import Link from "next/link";
import { MaskIcon } from "@/components/mask-icon";
import { Reveal } from "@/components/reveal";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { productLinks } from "@/lib/site";

const [wallet, ...tools] = productLinks;

export function HomeProducts() {
  return (
    <section
      aria-labelledby="products-heading"
      className="site-container pb-24 md:pb-32"
    >
      <Reveal className="max-w-3xl">
        <h2
          id="products-heading"
          className="font-display text-4xl leading-[0.96] font-semibold tracking-[-0.06em] text-balance sm:text-5xl lg:text-6xl"
        >
          One wallet.
          <br />
          <span className="text-muted-foreground">A full toolkit.</span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          Glyph starts with the wallet, then opens the Qubic network to apps,
          data, and services.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        <Reveal className="sm:col-span-2 lg:col-span-4">
          <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-foreground/[0.05] p-7 transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-foreground/[0.07] sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:p-9">
            <MaskIcon
              src="/masks/wallet.svg"
              interactive={false}
              className="-top-20 -right-10 size-64 opacity-15 sm:size-80"
            />

            <div className="relative z-10 max-w-md">
              <h3 className="font-display text-2xl leading-tight font-medium tracking-[-0.02em] md:text-3xl">
                {wallet.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                {wallet.description}
              </p>
            </div>

            <div className="relative z-10 mt-6 flex flex-wrap items-center gap-4 sm:mt-0">
              <SiteButtonLink href="/download" size="md">
                Download Glyph
                <SiteIcon icon={ArrowRightIcon} size={14} />
              </SiteButtonLink>
              <Link
                href={wallet.href}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Explore Wallet
                <SiteIcon icon={ArrowRightIcon} size={14} />
              </Link>
            </div>
          </article>
        </Reveal>

        {tools.map((tool, index) => (
          <Reveal
            key={tool.href}
            className="min-w-0"
            delay={0.05 + index * 0.06}
          >
            <Link
              href={tool.href}
              className="group flex h-full min-h-[12rem] flex-col rounded-[2rem] bg-foreground/[0.035] p-7 transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-foreground/[0.06] md:min-h-[13rem] md:p-8"
            >
              <h3 className="font-display text-lg leading-tight font-medium tracking-[-0.02em] transition-colors group-hover:text-brand">
                {tool.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                {tool.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 pt-8 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                Explore
                <SiteIcon icon={ArrowRightIcon} size={14} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
