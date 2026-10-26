import { ArrowRight } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { DownloadButton } from "@/components/download-button";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";

export function HomeHero() {
  return (
    <section className="site-container flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center py-16 text-center">
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

      <h1 className="mt-8 flex flex-wrap items-center justify-center gap-x-[0.12em] gap-y-1 font-display text-[clamp(3.4rem,8.5vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.07em]">
        <span>Glyph</span>
        <span className="inline-flex items-center rounded-[0.16em] bg-brand px-[0.12em] py-[0.04em] text-brand-foreground">
          Ecosystem
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
        Open-source tools for Qubic. A self-custodial desktop wallet, developer
        SDK, relay, and network explorer.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <DownloadButton size="lg" />
        <SiteButtonLink href="/products" variant="secondary" size="lg">
          Explore ecosystem
          <SiteIcon icon={ArrowRight} size={16} />
        </SiteButtonLink>
      </div>
    </section>
  );
}
