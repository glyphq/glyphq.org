import { ArrowRightIcon, HomeIcon } from "@solar-icons/react/linear";
import type { Metadata } from "next";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="site-container flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center py-20 text-center">
      <h1 className="font-display text-[clamp(6rem,16vw,11rem)] leading-[0.8] font-semibold tracking-[-0.09em]">
        404
      </h1>

      <h2 className="mt-8 max-w-lg font-display text-3xl leading-[1.02] tracking-[-0.04em] text-balance sm:text-4xl">
        Wrong turn.
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
        This page doesn't exist. It probably wandered off. The rest of the site
        is still here.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <SiteButtonLink href="/" size="lg">
          <SiteIcon icon={HomeIcon} size={16} />
          Back to home
        </SiteButtonLink>
        <SiteButtonLink href="/products" variant="secondary" size="lg">
          Browse products
          <SiteIcon icon={ArrowRightIcon} size={16} />
        </SiteButtonLink>
      </div>
    </section>
  );
}
