import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { siteConfig } from "@/lib/site";

export function HomeTrust() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="site-container pb-24 md:pb-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <h2
          id="trust-heading"
          className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
        >
          Built in the open.
          <br />
          <span className="text-muted-foreground">Yours to verify.</span>
        </h2>

        <div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            The wallet source, releases, and documentation are public. Read the
            code, follow what ships, or ask us anything in Discord.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SiteButtonLink
              href={siteConfig.links.github}
              external
              variant="secondary"
              size="md"
            >
              View the source
              <SiteIcon icon={ArrowRightUpIcon} size={16} />
            </SiteButtonLink>
            <SiteButtonLink
              href={siteConfig.links.discord}
              external
              variant="secondary"
              size="md"
            >
              Join Discord
            </SiteButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
