import { AccentAscii } from "@/components/accent-ascii";
import { DownloadButton } from "@/components/download-button";
import { Reveal } from "@/components/reveal";
import { SiteButtonLink } from "@/components/site-button";
import { siteConfig } from "@/lib/site";

export function HomeCta() {
  return (
    <section className="site-container">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand px-6 py-10 text-brand-foreground md:px-12 md:py-14">
          <AccentAscii cellSize={22} intensity={0.3} />
          <div className="relative z-10">
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
              <DownloadButton
                size="lg"
                className="bg-brand-foreground text-brand hover:bg-brand-foreground/90"
              />
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
      </Reveal>
    </section>
  );
}
