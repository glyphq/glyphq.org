import { ArrowRightIcon, ArrowRightUpIcon } from "@solar-icons/react/linear";
import { AccentBox } from "@/components/accent-box";
import { CopyButton } from "@/components/copy-button";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { SponsorFaq } from "@/components/sponsor-faq";
import { SponsorLedger } from "@/components/sponsor-ledger";
import { SponsorTiers } from "@/components/sponsor-tiers";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site";
import { sponsorConfig, sponsorsConfigured } from "@/lib/sponsors";

export const metadata = {
  ...pageMetadata({
    title: "Sponsors",
    description:
      "Sponsor Glyph with Qubic (QU) or USDT and follow every confirmed transfer in the public ledger.",
    path: "/sponsors",
  }),
  ...(sponsorsConfigured ? {} : { robots: { index: false, follow: false } }),
};

function FundingMethods() {
  return (
    <div>
      <div className="divide-y divide-foreground/10 border-t border-foreground/10">
        <div className="grid gap-5 py-5 md:grid-cols-[6rem_minmax(0,1fr)_auto] md:items-center md:gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">
              QU
            </p>
            <p className="mt-1 text-sm">Qubic</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Qubic identity</p>
            <p className="mt-1.5 font-mono text-xs leading-relaxed break-all text-foreground sm:text-sm">
              {sponsorConfig.qubicIdentity}
            </p>
          </div>
          <CopyButton
            value={sponsorConfig.qubicIdentity}
            label="Qubic identity"
            className="justify-self-start md:justify-self-end"
          />
        </div>

        <div className="grid gap-5 py-5 md:grid-cols-[6rem_minmax(0,1fr)_auto] md:items-center md:gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">
              USDT
            </p>
            <p className="mt-1 font-mono text-[0.65rem] tracking-[0.08em] text-muted-foreground uppercase">
              {sponsorConfig.usdtNetwork}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">USDT address</p>
            <p className="mt-1.5 font-mono text-xs leading-relaxed break-all text-foreground sm:text-sm">
              {sponsorConfig.usdtAddress}
            </p>
          </div>
          <CopyButton
            value={sponsorConfig.usdtAddress}
            label="USDT address"
            className="justify-self-start md:justify-self-end"
          />
        </div>
      </div>
      <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground text-pretty">
        Send only the asset named for each address. USDT sent on another network
        may be unrecoverable. A transfer is listed after it is confirmed.
      </p>
    </div>
  );
}

function FundingClosed() {
  return (
    <div className="border-t border-foreground/10 pt-8">
      <h3 className="max-w-lg font-display text-3xl leading-[1.02] font-medium tracking-[-0.045em] text-balance sm:text-4xl">
        Sponsorship opens with the first sponsor.
      </h3>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
        The Qubic identity and USDT address are published here with the first
        confirmed sponsorship. Nothing is being collected through this page yet.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-foreground/10 pt-5">
        <span className="font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase">
          QU / Qubic
        </span>
        <span className="font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase">
          USDT / Network confirmed at launch
        </span>
      </div>
      <SiteButtonLink
        href={siteConfig.links.discord}
        external
        variant="secondary"
        size="md"
        className="mt-8"
      >
        Ask about sponsorship
        <SiteIcon icon={ArrowRightUpIcon} size={16} />
      </SiteButtonLink>
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <>
      <section className="site-container pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-4xl">
          <div className="min-w-0">
            <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
              Sponsor
              <br />
              <AccentBox>open</AccentBox> Qubic.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              Glyph is the self-custodial desktop wallet and open toolchain for
              Qubic. Sponsors keep releases, documentation, and developer tools
              moving.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SiteButtonLink href="#funding" size="md">
                Sponsor Glyph
                <SiteIcon icon={ArrowRightIcon} size={16} />
              </SiteButtonLink>
              <SiteButtonLink href="#ledger" variant="secondary" size="md">
                See the ledger
              </SiteButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section
        id="funding"
        aria-labelledby="funding-heading"
        className="site-container scroll-mt-28 pb-24 md:pb-32"
      >
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <h2
              id="funding-heading"
              className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
            >
              Two assets.
              <br />
              <span className="text-muted-foreground">One ledger.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
              Sponsorship is accepted in Qubic (QU) or USDT. Send from a wallet
              you control, then keep the transaction ID for recognition and the
              ledger.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
              Tier thresholds use the USDT value of a confirmed transfer. QU is
              counted at that value when the transfer confirms.
            </p>
          </div>
          {sponsorsConfigured ? <FundingMethods /> : <FundingClosed />}
        </div>
      </section>

      <section
        id="tiers"
        aria-labelledby="tiers-heading"
        className="site-container scroll-mt-28 pb-24 md:pb-32"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
          <div>
            <h2
              id="tiers-heading"
              className="max-w-2xl font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl lg:text-6xl"
            >
              Support at the level that fits.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground text-pretty lg:pb-1">
            Every level includes a public record of the transfer. Higher levels
            add recognition across the repository, documentation, and roadmap.
          </p>
        </div>
        <SponsorTiers />
        <p className="mt-14 max-w-2xl text-xs leading-relaxed text-muted-foreground text-pretty lg:mt-20">
          Tier recognition is based on the confirmed value of a sponsorship.
          Thresholds and benefits may change for future sponsors; existing
          listings are not downgraded.
        </p>
      </section>

      <section
        id="ledger"
        aria-labelledby="ledger-heading"
        className="site-container scroll-mt-28 pb-24 md:pb-32"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
          <div>
            <h2
              id="ledger-heading"
              className="max-w-2xl font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl lg:text-6xl"
            >
              Every confirmed transfer.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground text-pretty lg:pb-1">
            Date, sponsor, asset, amount, tier, and transaction. Append-only,
            with no estimated or pending entries.
          </p>
        </div>
        <SponsorLedger transfers={sponsorConfig.transfers} />
      </section>

      <section
        aria-labelledby="faq-heading"
        className="site-container pb-24 md:pb-32"
      >
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <h2
              id="faq-heading"
              className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
            >
              Before you transfer.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              Short answers on transfers, tiers, and the public ledger. If
              anything is unclear, ask before sending.
            </p>
          </div>
          <SponsorFaq />
        </div>
      </section>

      <section className="site-container pb-24 md:pb-32">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-foreground/[0.04] px-6 py-12 md:px-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <h2 className="max-w-2xl font-display text-4xl leading-[0.96] font-semibold tracking-[-0.055em] text-balance sm:text-5xl md:text-6xl">
                The ledger starts with <AccentBox>one</AccentBox> name.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
                Ask about a tier, an anonymous listing, or a specific piece of
                work. Tell us what you want your sponsorship to support.
              </p>
            </div>
            <SiteButtonLink
              href={siteConfig.links.discord}
              external
              size="lg"
              className="justify-self-start lg:justify-self-end"
            >
              Join Discord
              <SiteIcon icon={ArrowRightUpIcon} size={16} />
            </SiteButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
