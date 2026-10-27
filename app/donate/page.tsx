import { ArrowRightIcon, ArrowRightUpIcon } from "@solar-icons/react/linear";
import Image from "next/image";
import { AccentBox } from "@/components/accent-box";
import { CopyButton } from "@/components/copy-button";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import {
  type ChainBalance,
  donationConfig,
  evmChains,
  formatUsdt,
  getDonationSnapshot,
  type QubicBalance,
} from "@/lib/donations";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Donate",
  description:
    "Support Glyph with ETH, POL, USDC, USDT, or QU. See live balances and the current monthly goal.",
  path: "/donate",
});

function ChainIcon({
  src,
  name,
  size = 24,
}: {
  src: string;
  name: string;
  size?: number;
}) {
  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      unoptimized
      style={{ width: size, height: size }}
      className="shrink-0 object-contain"
    />
  );
}

function AddressRow({ value, label }: { value: string; label: string }) {
  return (
    <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-foreground/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
      <code className="min-w-0 font-mono text-[0.7rem] leading-relaxed break-all text-foreground/85">
        {value}
      </code>
      <CopyButton
        value={value}
        label={label}
        className="justify-center sm:shrink-0"
      />
    </div>
  );
}

function BalanceCard({ balance }: { balance: ChainBalance }) {
  return (
    <article className="rounded-2xl bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-foreground/5">
            <ChainIcon
              src={balance.chain.icon}
              name={`${balance.chain.name} logo`}
            />
          </span>
          <span className="truncate text-sm font-medium">
            {balance.chain.name}
          </span>
        </div>
        <a
          href={`${balance.chain.explorerAddress}/${donationConfig.evmAddress}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${balance.chain.name} address`}
          className="text-muted-foreground transition-colors hover:text-brand"
        >
          <SiteIcon icon={ArrowRightUpIcon} size={13} />
        </a>
      </div>

      {balance.error ? (
        <p className="mt-6 text-sm text-muted-foreground">
          Balance unavailable right now.
        </p>
      ) : (
        <>
          <p className="mt-6 font-mono text-2xl tracking-[-0.04em]">
            {balance.native}{" "}
            <span className="text-sm text-muted-foreground">
              {balance.chain.nativeSymbol}
            </span>
          </p>
          {balance.tokens.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] text-muted-foreground">
              {balance.tokens.map((token) => (
                <span key={token.symbol}>
                  {token.formatted} {token.symbol}
                </span>
              ))}
            </div>
          ) : null}
        </>
      )}
    </article>
  );
}

function QubicBalanceCard({ balance }: { balance: QubicBalance }) {
  return (
    <article className="rounded-2xl bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-foreground/5">
            <ChainIcon src="/chains/qubic.svg" name="Qubic logo" />
          </span>
          <span className="truncate text-sm font-medium">Qubic</span>
        </div>
        <a
          href={`https://explorer.qubic.org/network/address/${donationConfig.qubicIdentity}`}
          target="_blank"
          rel="noreferrer"
          aria-label="View Qubic identity"
          className="text-muted-foreground transition-colors hover:text-brand"
        >
          <SiteIcon icon={ArrowRightUpIcon} size={13} />
        </a>
      </div>

      {balance.error ? (
        <p className="mt-6 text-sm text-muted-foreground">
          Balance unavailable right now.
        </p>
      ) : (
        <p className="mt-6 font-mono text-2xl tracking-[-0.04em]">
          {balance.formatted}{" "}
          <span className="text-sm text-muted-foreground">QU</span>
        </p>
      )}
    </article>
  );
}

export default async function DonatePage() {
  const snapshot = await getDonationSnapshot();
  const goal = donationConfig.monthlyGoalUsdt;
  const progress =
    goal > 0
      ? Math.min(100, Math.round((snapshot.monthlyRaisedUsdt / goal) * 100))
      : 0;

  return (
    <>
      <section className="site-container pt-16 pb-14 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[0.65rem] tracking-[0.18em] text-brand uppercase">
            Support Glyph
          </p>
          <h1 className="mt-4 font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
            Keep Glyph <AccentBox>shipping</AccentBox>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Glyph is free and open source. Donations cover releases,
            infrastructure, and the time behind the wallet and developer tools.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <SiteButtonLink href="#methods" size="md">
              Donate
              <SiteIcon icon={ArrowRightIcon} size={16} />
            </SiteButtonLink>
            <SiteButtonLink href="#balances" variant="secondary" size="md">
              See balances
            </SiteButtonLink>
          </div>
        </div>
      </section>

      <section className="site-container pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
                This month
              </p>
              <p className="mt-2 font-display text-4xl font-medium tracking-[-0.05em]">
                {formatUsdt(snapshot.monthlyRaisedUsdt)}{" "}
                <span className="text-lg tracking-[-0.03em] text-muted-foreground">
                  of {formatUsdt(goal)} USDT
                </span>
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {progress}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Monthly donation goal"
            aria-valuemin={0}
            aria-valuemax={goal}
            aria-valuenow={Math.min(goal, snapshot.monthlyRaisedUsdt)}
            className="mt-5 h-1.5 overflow-hidden rounded-full bg-foreground/10"
          >
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground text-pretty">
            {snapshot.monthlyRaisedUsdt === 0
              ? "No confirmed donations yet this month."
              : "Confirmed donations update this total as they clear."}
          </p>
        </div>
      </section>

      <section
        id="methods"
        aria-labelledby="methods-heading"
        className="site-container scroll-mt-28 pb-16 md:pb-20"
      >
        <div className="mx-auto grid max-w-5xl gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl bg-card p-6 sm:p-8">
            <p className="font-mono text-[0.6rem] tracking-[0.16em] text-brand uppercase">
              EVM
            </p>
            <h2
              id="methods-heading"
              className="mt-3 font-display text-3xl leading-[1] font-semibold tracking-[-0.05em]"
            >
              One address, every EVM network.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
              The same address works on Ethereum, Base, Polygon, Arbitrum, and
              Optimism. Send ETH, POL, USDC, USDT, or another EVM asset.
            </p>
            <AddressRow value={donationConfig.evmAddress} label="EVM address" />
            <ul className="mt-5 flex flex-wrap gap-2">
              {evmChains.map((chain) => (
                <li
                  key={chain.id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-2.5 py-1.5 text-[0.7rem] text-muted-foreground"
                >
                  <ChainIcon
                    src={chain.icon}
                    name={`${chain.name} logo`}
                    size={16}
                  />
                  {chain.name}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">
              Send only from a wallet you control. Transfers are final.
            </p>
          </div>

          <div className="rounded-3xl bg-card p-6 sm:p-8">
            <p className="font-mono text-[0.6rem] tracking-[0.16em] text-brand uppercase">
              Qubic
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-foreground/5">
                <ChainIcon
                  src="/chains/qubic.svg"
                  name="Qubic logo"
                  size={22}
                />
              </span>
              <h2 className="font-display text-3xl leading-[1] font-semibold tracking-[-0.05em]">
                Send QU.
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
              Use this identity for Qubic donations. Keep the transaction ID
              after you send.
            </p>
            <AddressRow
              value={donationConfig.qubicIdentity}
              label="Qubic identity"
            />
          </div>
        </div>
      </section>

      <section
        id="balances"
        aria-labelledby="balances-heading"
        className="site-container scroll-mt-28 pb-16 md:pb-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-foreground/10 pb-4">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
                Transparency
              </p>
              <h2
                id="balances-heading"
                className="mt-2 font-display text-3xl leading-[1] font-semibold tracking-[-0.05em]"
              >
                What is on each chain.
              </h2>
            </div>
            <p className="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">
              Live balances
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {snapshot.evm.map((balance) => (
              <BalanceCard key={balance.chain.id} balance={balance} />
            ))}
            <QubicBalanceCard balance={snapshot.qubic} />
          </div>

          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground text-pretty">
            Native balances and native USDC/USDT are tracked across the EVM
            networks. Other tokens can still be sent to the address but are not
            listed here.
          </p>
        </div>
      </section>

      <section className="site-container pb-20 md:pb-24">
        <div className="mx-auto max-w-3xl border-t border-foreground/10 pt-6">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
            Donations pay for releases, test infrastructure, and the time it
            takes to keep the wallet and developer tools moving. Questions
            before sending? Ask in Discord.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <SiteButtonLink
              href={siteConfig.links.discord}
              external
              size="md"
              variant="secondary"
            >
              Join Discord
              <SiteIcon icon={ArrowRightUpIcon} size={16} />
            </SiteButtonLink>
            <SiteButtonLink href="/about" variant="secondary" size="md">
              About Glyph
            </SiteButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
