"use client";

import {
  ArrowRightIcon,
  ArrowRightUpIcon,
  CloseIcon,
} from "@solar-icons/react/linear";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Image from "next/image";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AccentBox } from "@/components/accent-box";
import { CopyButton } from "@/components/copy-button";
import { SiteButton, SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import type { ChainBalance, QubicBalance } from "@/lib/donations";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type DonateTab = "evm" | "qubic";

type DonationExperienceProps = {
  evmAddress: string;
  qubicIdentity: string;
  evmBalances: ChainBalance[];
  qubicBalance: QubicBalance;
  donatedStablecoins: number;
};

const stablecoinFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatStablecoin(value: number) {
  return stablecoinFormatter.format(value);
}

function ChainIcon({ src, size = 20 }: { src: string; size?: number }) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized
      style={{ width: size, height: size }}
      className="shrink-0 object-contain"
    />
  );
}

function useDialog(open: boolean, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = [
        ...panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((element) => element.offsetParent !== null);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  return { panelRef, closeRef };
}

function Dialog({
  open,
  onClose,
  title,
  titleId,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId: string;
  children: ReactNode;
}) {
  const { panelRef, closeRef } = useDialog(open, onClose);

  return (
    <AnimatePresence>
      {open ? (
        <MotionConfig reducedMotion="user">
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={onClose}
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative z-10 max-h-[min(90svh,46rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-3xl bg-popover p-5 shadow-2xl shadow-black/50 sm:p-6"
              initial={{ opacity: 0, y: 12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start justify-between gap-4">
                <h2
                  id={titleId}
                  className="font-display text-2xl leading-tight font-semibold tracking-[-0.045em]"
                >
                  {title}
                </h2>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="-mt-1 -mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <SiteIcon icon={CloseIcon} size={16} />
                </button>
              </div>
              {children}
            </motion.div>
          </motion.div>
        </MotionConfig>
      ) : null}
    </AnimatePresence>
  );
}

function TokenRows({ balance }: { balance?: ChainBalance }) {
  if (!balance || balance.error) {
    return (
      <p className="mt-4 text-sm text-muted-foreground">
        Stablecoin balances unavailable right now.
      </p>
    );
  }

  return (
    <div className="mt-4 divide-y divide-foreground/10">
      {balance.tokens.map((token) => (
        <div
          key={token.symbol}
          className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
        >
          <span className="font-mono text-xs text-muted-foreground">
            {token.symbol}
          </span>
          <span className="font-mono text-sm">{token.formatted}</span>
        </div>
      ))}
    </div>
  );
}

function EvmDonatePanel({
  evmAddress,
  evmBalances,
  selectedChain,
  onSelectChain,
}: {
  evmAddress: string;
  evmBalances: ChainBalance[];
  selectedChain: string;
  onSelectChain: (chain: string) => void;
}) {
  const selected =
    evmBalances.find((balance) => balance.chain.id === selectedChain) ??
    evmBalances[0];

  if (!selected) return null;

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-1.5">
        {evmBalances.map((balance) => {
          const active = balance.chain.id === selected.chain.id;

          return (
            <button
              key={balance.chain.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelectChain(balance.chain.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "bg-foreground/10 text-foreground"
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
              )}
            >
              <ChainIcon src={balance.chain.icon} size={16} />
              {balance.chain.name}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-foreground/[0.04] p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm font-medium">
            <ChainIcon src={selected.chain.icon} size={18} />
            {selected.chain.name}
          </span>
          <a
            href={`${selected.chain.explorerAddress}/${evmAddress}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-brand"
          >
            Explorer
            <SiteIcon icon={ArrowRightUpIcon} size={12} />
          </a>
        </div>
        <p className="mt-3 font-mono text-xs leading-relaxed break-all text-foreground/85">
          {evmAddress}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <CopyButton value={evmAddress} label="EVM address" />
          <span className="text-xs text-muted-foreground">
            Same address on every EVM network.
          </span>
        </div>
      </div>

      <TokenRows balance={selected} />

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">
        Send USDC, USDT, ETH, POL, or another EVM asset on {selected.chain.name}
        . Transfers are final.
      </p>
    </div>
  );
}

function DonateDialog({
  open,
  onClose,
  tab,
  onTabChange,
  evmAddress,
  qubicIdentity,
  evmBalances,
  qubicBalance,
}: {
  open: boolean;
  onClose: () => void;
  tab: DonateTab;
  onTabChange: (tab: DonateTab) => void;
  evmAddress: string;
  qubicIdentity: string;
  evmBalances: ChainBalance[];
  qubicBalance: QubicBalance;
}) {
  const [selectedChain, setSelectedChain] = useState<string>(
    evmBalances[0]?.chain.id ?? "ethereum",
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Donate to Glyph"
      titleId="donate-dialog-title"
    >
      <div className="mt-5 grid grid-cols-2 gap-1 rounded-full bg-foreground/5 p-1">
        {(["evm", "qubic"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={tab === value}
            onClick={() => onTabChange(value)}
            className={cn(
              "h-9 rounded-full text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              tab === value
                ? "bg-foreground/10 text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {value === "evm" ? "EVM networks" : "Qubic"}
          </button>
        ))}
      </div>

      {tab === "evm" ? (
        <EvmDonatePanel
          evmAddress={evmAddress}
          evmBalances={evmBalances}
          selectedChain={selectedChain}
          onSelectChain={setSelectedChain}
        />
      ) : (
        <div className="mt-5">
          <div className="flex items-center gap-3 rounded-2xl bg-foreground/[0.04] p-4">
            <ChainIcon src="/chains/qubic.svg" size={28} />
            <div>
              <p className="text-sm font-medium">Qubic</p>
              <p className="mt-0.5 font-mono text-lg">
                {qubicBalance.error
                  ? "Unavailable"
                  : `${qubicBalance.formatted} QU`}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
            Send QU to this identity. Keep the transaction ID after you send.
          </p>
          <div className="mt-4 rounded-2xl bg-foreground/[0.04] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">Identity</span>
              <a
                href={`https://explorer.qubic.org/network/address/${qubicIdentity}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-brand"
              >
                Explorer
                <SiteIcon icon={ArrowRightUpIcon} size={12} />
              </a>
            </div>
            <p className="mt-2 font-mono text-xs leading-relaxed break-all text-foreground/85">
              {qubicIdentity}
            </p>
            <CopyButton
              value={qubicIdentity}
              label="Qubic identity"
              className="mt-3"
            />
          </div>
        </div>
      )}
    </Dialog>
  );
}

function BalancesDialog({
  open,
  onClose,
  evmAddress,
  evmBalances,
  qubicBalance,
  donatedStablecoins,
}: {
  open: boolean;
  onClose: () => void;
  evmAddress: string;
  evmBalances: ChainBalance[];
  qubicBalance: QubicBalance;
  donatedStablecoins: number;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Balances"
      titleId="balances-dialog-title"
    >
      <div className="mt-5 rounded-2xl bg-foreground/[0.04] p-4">
        <p className="font-display text-4xl leading-none font-medium tracking-[-0.05em]">
          {formatStablecoin(donatedStablecoins)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          USDT + USDC across EVM networks
        </p>
      </div>

      <div className="mt-5 divide-y divide-foreground/10">
        {evmBalances.map((balance) => (
          <div key={balance.chain.id} className="py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm">
                <ChainIcon src={balance.chain.icon} size={18} />
                {balance.chain.name}
              </span>
              <a
                href={`${balance.chain.explorerAddress}/${evmAddress}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${balance.chain.name} balance`}
                className="text-muted-foreground transition-colors hover:text-brand"
              >
                <SiteIcon icon={ArrowRightUpIcon} size={12} />
              </a>
            </div>
            {balance.error ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Unavailable right now.
              </p>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-4">
                {balance.tokens.map((token) => (
                  <div
                    key={token.symbol}
                    className="flex items-baseline justify-between gap-3 font-mono text-xs"
                  >
                    <span className="text-muted-foreground">
                      {token.symbol}
                    </span>
                    <span>{token.formatted}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 border-t border-foreground/10 pt-4">
        <span className="flex items-center gap-2 text-sm">
          <ChainIcon src="/chains/qubic.svg" size={18} />
          Qubic
        </span>
        <span className="font-mono text-xs">
          {qubicBalance.error ? "Unavailable" : `${qubicBalance.formatted} QU`}
        </span>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">
        USDT and USDC are tracked across EVM networks. Other tokens can still be
        sent but are not listed here.
      </p>
    </Dialog>
  );
}

function DonationMethodCard({
  title,
  description,
  balance,
  icons,
  onClick,
}: {
  title: string;
  description: string;
  balance: string;
  icons: string[];
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-64 flex-col rounded-3xl bg-card p-6 text-left transition-colors hover:bg-foreground/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8"
    >
      <div className="flex items-center gap-2">
        {icons.map((icon) => (
          <span
            key={icon}
            className="flex size-8 items-center justify-center rounded-full bg-foreground/5"
          >
            <ChainIcon src={icon} size={17} />
          </span>
        ))}
      </div>
      <h2 className="mt-5 font-display text-3xl leading-[1] font-semibold tracking-[-0.05em]">
        {title}
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
        {description}
      </p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <p className="font-mono text-2xl tracking-[-0.04em]">{balance}</p>
        <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          Open
        </span>
      </div>
    </button>
  );
}

export function DonationExperience({
  evmAddress,
  qubicIdentity,
  evmBalances,
  qubicBalance,
  donatedStablecoins,
}: DonationExperienceProps) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [donateTab, setDonateTab] = useState<DonateTab>("evm");
  const [balancesOpen, setBalancesOpen] = useState(false);

  const closeDonate = useCallback(() => setDonateOpen(false), []);
  const closeBalances = useCallback(() => setBalancesOpen(false), []);

  const openDonate = (tab: DonateTab) => {
    setDonateTab(tab);
    setDonateOpen(true);
  };

  return (
    <>
      <section className="site-container pt-16 pb-14 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
            Keep Glyph <AccentBox>shipping</AccentBox>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Glyph is free and open source. Donations cover releases,
            infrastructure, and the time behind the wallet and developer tools.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <SiteButton size="md" onClick={() => openDonate("evm")}>
              Donate
              <SiteIcon icon={ArrowRightIcon} size={16} />
            </SiteButton>
            <SiteButton
              variant="secondary"
              size="md"
              onClick={() => setBalancesOpen(true)}
            >
              View balances
            </SiteButton>
          </div>
          <div className="mt-10">
            <p className="font-display text-5xl leading-none font-medium tracking-[-0.055em]">
              {formatStablecoin(donatedStablecoins)}{" "}
              <span className="text-lg tracking-[-0.03em] text-muted-foreground">
                USDT + USDC
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">donated so far</p>
          </div>
        </div>
      </section>

      <section className="site-container pb-16 md:pb-20">
        <div className="mx-auto grid max-w-5xl gap-3 md:grid-cols-2">
          <DonationMethodCard
            title="EVM networks"
            description="One address on Ethereum, Base, Polygon, Arbitrum, and Optimism. Send USDC, USDT, or any other EVM asset."
            balance={`${formatStablecoin(donatedStablecoins)} USDT + USDC`}
            icons={evmBalances.map((balance) => balance.chain.icon)}
            onClick={() => openDonate("evm")}
          />
          <DonationMethodCard
            title="Qubic"
            description="Send QU to the Glyph identity. The same address works for every Qubic transfer."
            balance={
              qubicBalance.error
                ? "Balance unavailable"
                : `${qubicBalance.formatted} QU`
            }
            icons={["/chains/qubic.svg"]}
            onClick={() => openDonate("qubic")}
          />
        </div>
        <p className="mx-auto mt-4 max-w-5xl text-xs leading-relaxed text-muted-foreground text-pretty">
          Balances update every minute. Open a method to get the address, copy
          it, and jump to the explorer.
        </p>
      </section>

      <section className="site-container pb-20 md:pb-24">
        <div className="mx-auto max-w-5xl border-t border-foreground/10 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
              Donations pay for releases, test infrastructure, and the time it
              takes to keep the wallet and developer tools moving. Questions
              before sending? Ask in Discord.
            </p>
            <div className="flex flex-wrap gap-3">
              <SiteButtonLink
                href={siteConfig.links.discord}
                external
                variant="secondary"
                size="md"
              >
                Join Discord
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
              <SiteButtonLink href="/about" variant="secondary" size="md">
                About Glyph
              </SiteButtonLink>
            </div>
          </div>
        </div>
      </section>

      <DonateDialog
        open={donateOpen}
        onClose={closeDonate}
        tab={donateTab}
        onTabChange={setDonateTab}
        evmAddress={evmAddress}
        qubicIdentity={qubicIdentity}
        evmBalances={evmBalances}
        qubicBalance={qubicBalance}
      />
      <BalancesDialog
        open={balancesOpen}
        onClose={closeBalances}
        evmAddress={evmAddress}
        evmBalances={evmBalances}
        qubicBalance={qubicBalance}
        donatedStablecoins={donatedStablecoins}
      />
    </>
  );
}
