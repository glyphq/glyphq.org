import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import { MaskIcon } from "@/components/mask-icon";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { TrustIndex } from "@/components/trust-index";
import { siteConfig } from "@/lib/site";

const artifacts = [
  {
    id: "source",
    label: "Source code",
    detail: "GitHub",
    action: "View the source",
    href: siteConfig.links.github,
  },
  {
    id: "releases",
    label: "Releases",
    detail: "GitHub Releases",
    action: "Follow releases",
    href: siteConfig.links.releases,
  },
  {
    id: "docs",
    label: "Documentation",
    detail: "docs.glyphq.org",
    action: "Read the docs",
    href: siteConfig.links.docs,
  },
] as const;

const index = [
  ...artifacts.map((artifact) => ({
    id: artifact.id,
    label: artifact.label,
  })),
  { id: "community", label: "Community" },
];

export function HomeTrust() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="site-container pb-24 md:pb-32"
    >
      <div className="mx-auto max-w-[61.625rem]">
        <div className="grid gap-10 md:grid-cols-[16.125rem_minmax(0,1fr)] md:gap-12">
          <aside className="hidden md:block">
            <TrustIndex items={index} />
          </aside>

          <div className="relative overflow-hidden">
            <MaskIcon
              src="/masks/eye.svg"
              interactive={false}
              className="-top-12 -right-12 size-[16rem] rotate-[-8deg] opacity-10 md:size-[24rem] lg:size-[28rem]"
            />

            <div className="relative z-10">
              <h2
                id="trust-heading"
                className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
              >
                Built in the open.
                <br />
                <span className="text-muted-foreground">Yours to verify.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
                The wallet source, releases, and documentation are public. Read
                the code, follow what ships, or ask us anything in Discord.
              </p>

              <div className="mt-10 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-foreground/10">
                      <th className="py-3 pr-6 font-mono text-[0.65rem] font-normal tracking-[0.14em] text-muted-foreground uppercase">
                        Artifact
                      </th>
                      <th className="hidden py-3 pr-6 font-mono text-[0.65rem] font-normal tracking-[0.14em] text-muted-foreground uppercase sm:table-cell">
                        Where
                      </th>
                      <th className="py-3 text-right font-mono text-[0.65rem] font-normal tracking-[0.14em] text-muted-foreground uppercase">
                        Open
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {artifacts.map((artifact) => (
                      <tr
                        key={artifact.id}
                        id={artifact.id}
                        className="scroll-mt-28 border-b border-foreground/10 align-top"
                      >
                        <td className="py-5 pr-6">
                          <span className="block font-medium text-foreground">
                            {artifact.label}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground sm:hidden">
                            {artifact.detail}
                          </span>
                        </td>
                        <td className="hidden py-5 pr-6 text-muted-foreground sm:table-cell">
                          {artifact.detail}
                        </td>
                        <td className="py-5 text-right whitespace-nowrap">
                          <a
                            href={artifact.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-brand"
                          >
                            {artifact.action}
                            <SiteIcon icon={ArrowRightUpIcon} size={12} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div id="community" className="mt-10 scroll-mt-28">
                <p className="text-sm text-muted-foreground">
                  Ask us anything in Discord.
                </p>
                <SiteButtonLink
                  href={siteConfig.links.discord}
                  external
                  variant="secondary"
                  size="md"
                  className="mt-4"
                >
                  Join Discord
                  <SiteIcon icon={ArrowRightUpIcon} size={16} />
                </SiteButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
