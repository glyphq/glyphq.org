import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import { AccentBox } from "@/components/accent-box";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site";
import { sponsorConfig, sponsorsConfigured } from "@/lib/sponsors";

export const metadata = {
  ...pageMetadata({
    title: "Sponsors",
    description: "Sponsor the Glyph wallet and its open-source tools.",
    path: "/sponsors",
  }),
  ...(sponsorsConfigured ? {} : { robots: { index: false, follow: false } }),
};

export default function SponsorsPage() {
  return (
    <>
      <section className="site-container pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-4xl">
          <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
            Sponsor <AccentBox>Glyph</AccentBox>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Help keep the wallet and the open-source tools around it moving.
          </p>
        </div>
      </section>

      <div className="bg-background">
        {sponsorsConfigured ? (
          <section className="site-container pb-24 md:pb-32">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <h2 className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
                Sponsor identity.
              </h2>
              <div>
                <code className="block break-all rounded-2xl bg-foreground/5 p-5 font-mono text-sm">
                  {sponsorConfig.identity}
                </code>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  Send QU to this identity. Include a name in the memo if you
                  want to be listed.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section className="site-container pb-24 md:pb-32">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
                Sponsorship opens with the first sponsor.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
                The sponsor identity and transfer ledger will be published with
                the first confirmed sponsor. If you want to support Glyph now,
                get in touch.
              </p>
              <SiteButtonLink
                href={siteConfig.links.discord}
                external
                size="md"
                className="mt-8"
              >
                Talk to us on Discord
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
            </div>
          </section>
        )}

        <section className="site-container pb-24 md:pb-32">
          <h2 className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
            Sponsor ledger.
          </h2>
          {sponsorConfig.sponsors.length > 0 ? (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-3 text-left font-mono text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground">
                    <th className="pr-6 font-normal">Sponsor</th>
                    <th className="pr-6 font-normal">Identity</th>
                    <th className="pr-6 font-normal">QU</th>
                    <th className="font-normal">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sponsorConfig.sponsors.map((sponsor) => (
                    <tr key={sponsor.identity}>
                      <td className="pr-6 font-medium">{sponsor.name}</td>
                      <td className="pr-6 font-mono text-xs break-all">
                        {sponsor.identity}
                      </td>
                      <td className="pr-6">{sponsor.amount}</td>
                      <td className="text-muted-foreground">{sponsor.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
              No sponsors listed yet.
            </p>
          )}
        </section>

        <section className="site-container pb-24 md:pb-32">
          <h2 className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
            How it works.
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="font-display text-lg font-medium tracking-[-0.02em]">
                Send QU
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                Send a Qubic transfer to the sponsor identity once it is
                published.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-medium tracking-[-0.02em]">
                Confirm
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                We verify the transfer on the network.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-medium tracking-[-0.02em]">
                List
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                Your sponsorship appears here with your permission.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
