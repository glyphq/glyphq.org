import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import { Reveal } from "@/components/reveal";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { siteConfig } from "@/lib/site";

const artifacts = [
  { label: "Source", href: siteConfig.links.github },
  { label: "Releases", href: siteConfig.links.releases },
  { label: "Documentation", href: siteConfig.links.docs },
];

export function HomeTrust() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="site-container pb-24 md:pb-32"
    >
      <Reveal>
        <div className="rounded-[2rem] bg-foreground/[0.035] p-7 md:p-12">
          <div className="max-w-2xl">
            <h2
              id="trust-heading"
              className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
            >
              Built in the open.
              <br />
              <span className="text-muted-foreground">Yours to verify.</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
              The wallet source, releases, and documentation are public. Read
              the code, follow what ships, or ask us anything in Discord.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {artifacts.map((artifact) => (
                <li key={artifact.label}>
                  <a
                    href={artifact.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-brand"
                  >
                    {artifact.label}
                    <SiteIcon icon={ArrowRightUpIcon} size={12} />
                  </a>
                </li>
              ))}
            </ul>

            <SiteButtonLink
              href={siteConfig.links.discord}
              external
              variant="secondary"
              size="md"
              className="mt-10"
            >
              Join Discord
              <SiteIcon icon={ArrowRightUpIcon} size={16} />
            </SiteButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
