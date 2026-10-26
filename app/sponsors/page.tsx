import { ArrowRightIcon, ArrowRightUpIcon } from "@solar-icons/react/linear";
import { AccentBox } from "@/components/accent-box";
import { CopyButton } from "@/components/copy-button";
import { Faq } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { SponsorLedger } from "@/components/sponsor-ledger";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site";
import {
  formatSponsorThreshold,
  sponsorConfig,
  sponsorsConfigured,
  sponsorshipThresholds,
} from "@/lib/sponsors";

export const metadata = {
  ...pageMetadata({
    title: "Sponsors",
    description:
      "Sponsor Glyph with Qubic (QU) or USDT. Recognition starts at 25 USDT, and every confirmed transfer is listed in the public ledger.",
    path: "/sponsors",
  }),
  ...(sponsorsConfigured ? {} : { robots: { index: false, follow: false } }),
};

const faqs = [
  {
    question: "How do I send QU or USDT?",
    answer:
      "Use the Qubic identity or USDT address on this page. Send only the named asset and keep the transaction ID.",
  },
  {
    question: "How are thresholds counted?",
    answer:
      "Thresholds use the USDT value of a confirmed transfer. QU counts at that value when it confirms.",
  },
  {
    question: "What appears in the ledger?",
    answer:
      "Confirmed transfers only: date, sponsor, asset, amount, recognition, and transaction.",
  },
] as const;

function FundingMethods() {
  return (
    <div>
      <div className="divide-y divide-foreground/10">
        <div className="grid gap-4 py-4 md:grid-cols-[5rem_minmax(0,1fr)_auto] md:items-center md:gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">
              QU
            </p>
            <p className="mt-1 text-sm">Qubic</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Qubic identity</p>
            <p className="mt-1 font-mono text-xs leading-relaxed break-all text-foreground sm:text-sm">
              {sponsorConfig.qubicIdentity}
            </p>
          </div>
          <CopyButton
            value={sponsorConfig.qubicIdentity}
            label="Qubic identity"
            className="justify-self-start md:justify-self-end"
          />
        </div>

        <div className="grid gap-4 py-4 md:grid-cols-[5rem_minmax(0,1fr)_auto] md:items-center md:gap-6">
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
            <p className="mt-1 font-mono text-xs leading-relaxed break-all text-foreground sm:text-sm">
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
        Send only the asset named for each address. A transfer is listed once it
        is confirmed.
      </p>
    </div>
  );
}

function FundingClosed() {
  return (
    <div>
      <h3 className="font-display text-2xl leading-tight font-medium tracking-[-0.035em] text-balance sm:text-3xl">
        Sponsorship opens with the first sponsor.
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
        Qubic (QU) and USDT details are published here with the first confirmed
        sponsorship. Nothing is being collected through this page yet.
      </p>
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <>
      <section className="site-container pt-16 pb-20 md:pt-24 md:pb-24">
        <Reveal className="mx-auto max-w-4xl text-center" mount>
          <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
            Sponsor <AccentBox>Glyph</AccentBox>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Glyph is a self-custodial Qubic wallet and open toolchain, and
            sponsors keep releases and developer tools moving.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <SiteButtonLink href="#funding" size="md">
              Sponsor Glyph
              <SiteIcon icon={ArrowRightIcon} size={16} />
            </SiteButtonLink>
            <SiteButtonLink href="#ledger" variant="secondary" size="md">
              See the ledger
            </SiteButtonLink>
          </div>
        </Reveal>
      </section>

      <section
        id="funding"
        aria-labelledby="funding-heading"
        className="site-container scroll-mt-28 pb-20 md:pb-24"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <h2
              id="funding-heading"
              className="font-display text-3xl leading-[1] font-semibold tracking-[-0.05em] text-balance sm:text-4xl"
            >
              Funding
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              Sponsorship is accepted in Qubic (QU) or USDT. Send from a wallet
              you control and keep the transaction ID.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl bg-card p-6 sm:p-8">
            {sponsorsConfigured ? <FundingMethods /> : <FundingClosed />}
          </Reveal>
        </div>
      </section>

      <section
        id="thresholds"
        aria-labelledby="thresholds-heading"
        className="site-container scroll-mt-28 pb-20 md:pb-24"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <h2
              id="thresholds-heading"
              className="font-display text-3xl leading-[1] font-semibold tracking-[-0.05em] text-balance sm:text-4xl"
            >
              Recognition
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              Thresholds use the USDT value of a confirmed transfer. QU counts
              at that value when the transfer confirms.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl bg-card p-6 sm:p-8">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-foreground/10 text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
                  <th className="py-4 pr-5 font-mono font-normal">Threshold</th>
                  <th className="py-4 font-mono font-normal">Recognition</th>
                </tr>
              </thead>
              <tbody>
                {sponsorshipThresholds.map((threshold) => (
                  <tr
                    key={threshold.id}
                    className="border-b border-foreground/10"
                  >
                    <td className="py-4 pr-5 font-mono text-xs whitespace-nowrap">
                      {formatSponsorThreshold(threshold.thresholdUsdt)} USDT
                    </td>
                    <td className="py-4 text-muted-foreground">
                      {threshold.recognition}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section
        id="ledger"
        aria-labelledby="ledger-heading"
        className="site-container scroll-mt-28 pb-20 md:pb-24"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <h2
              id="ledger-heading"
              className="font-display text-3xl leading-[1] font-semibold tracking-[-0.05em] text-balance sm:text-4xl"
            >
              Ledger
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              Every confirmed transfer, append-only.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <SponsorLedger transfers={sponsorConfig.transfers} />
          </Reveal>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="site-container scroll-mt-28 pb-20 md:pb-24"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <h2
              id="faq-heading"
              className="font-display text-3xl leading-[1] font-semibold tracking-[-0.05em] text-balance sm:text-4xl"
            >
              FAQ
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              Transfers, thresholds, and the public ledger.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="site-container pb-20 md:pb-24">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-foreground/10 pt-6">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              Questions before sending? Ask in Discord.
            </p>
            <SiteButtonLink
              href={siteConfig.links.discord}
              external
              size="md"
              variant="secondary"
            >
              Join Discord
              <SiteIcon icon={ArrowRightUpIcon} size={16} />
            </SiteButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
