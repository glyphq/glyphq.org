"use client";

import {
  AltArrowLeftIcon,
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
import type {
  ChainBalance,
  QubicBalance,
  SolanaBalance,
  TokenBalance,
} from "@/lib/donations";
import { siteConfig } from "@/lib/site";
import { sponsors } from "@/lib/sponsors";
import { cn } from "@/lib/utils";

type DonateTab = "evm" | "solana" | "qubic";
type DonateStep = 1 | 2;

type DonationExperienceProps = {
  evmAddress: string;
  qubicIdentity: string;
  solanaAddress: string;
  evmBalances: ChainBalance[];
  solanaBalance: SolanaBalance;
  qubicBalance: QubicBalance;
  evmStablecoins: number;
  solanaStablecoins: number;
  usdcTotal: number;
  usdtTotal: number;
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

const tokenIcons: Record<string, string> = {
  USDC: "/tokens/usdc.svg",
  USDT: "/tokens/usdt.svg",
};

function TokenIcon({ symbol, size = 18 }: { symbol: string; size?: number }) {
  const src = tokenIcons[symbol];

  if (!src) return null;

  return <ChainIcon src={src} size={size} />;
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

function TokenRows({
  tokens,
  error,
}: {
  tokens: TokenBalance[];
  error?: boolean;
}) {
  if (error) {
    return (
      <p className="mt-4 text-sm text-muted-foreground">
        Stablecoin balances unavailable right now.
      </p>
    );
  }

  return (
    <div className="mt-4 divide-y divide-foreground/10">
      {tokens.map((token) => (
        <div
          key={token.symbol}
          className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
        >
          <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <TokenIcon symbol={token.symbol} size={16} />
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

      <TokenRows tokens={selected.tokens} error={selected.error} />

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">
        Send USDC, USDT, ETH, POL, or another EVM asset on {selected.chain.name}
        . Transfers are final.
      </p>
    </div>
  );
}

function SolanaDonatePanel({
  solanaAddress,
  solanaBalance,
}: {
  solanaAddress: string;
  solanaBalance: SolanaBalance;
}) {
  return (
    <div className="mt-5">
      <div className="rounded-2xl bg-foreground/[0.04] p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm font-medium">
            <ChainIcon src="/chains/solana.svg" size={18} />
            Solana
          </span>
          <a
            href={`https://solscan.io/account/${solanaAddress}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-brand"
          >
            Explorer
            <SiteIcon icon={ArrowRightUpIcon} size={12} />
          </a>
        </div>
        <p className="mt-3 font-mono text-xs leading-relaxed break-all text-foreground/85">
          {solanaAddress}
        </p>
        <div className="mt-3">
          <CopyButton value={solanaAddress} label="Solana address" />
        </div>
      </div>

      <TokenRows tokens={solanaBalance.tokens} error={solanaBalance.error} />

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">
        Send USDC or USDT on Solana. Transfers are final.
      </p>
    </div>
  );
}

function NetworkOption({
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
      className="flex w-full items-center gap-3 rounded-2xl bg-foreground/[0.04] p-4 text-left transition-colors hover:bg-foreground/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex shrink-0 items-center gap-1">
        {icons.slice(0, 3).map((icon) => (
          <ChainIcon key={icon} src={icon} size={20} />
        ))}
        {icons.length > 3 ? (
          <span className="ml-0.5 font-mono text-[0.65rem] text-muted-foreground">
            +{icons.length - 3}
          </span>
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-2 font-mono text-[0.7rem] text-muted-foreground">
        {balance}
        <SiteIcon icon={ArrowRightIcon} size={13} />
      </span>
    </button>
  );
}

function DonateDialog({
  open,
  onClose,
  step,
  onSelectNetwork,
  onBack,
  tab,
  evmAddress,
  qubicIdentity,
  solanaAddress,
  evmBalances,
  solanaBalance,
  qubicBalance,
}: {
  open: boolean;
  onClose: () => void;
  step: DonateStep;
  onSelectNetwork: (tab: DonateTab) => void;
  onBack: () => void;
  tab: DonateTab;
  evmAddress: string;
  qubicIdentity: string;
  solanaAddress: string;
  evmBalances: ChainBalance[];
  solanaBalance: SolanaBalance;
  qubicBalance: QubicBalance;
}) {
  const [selectedChain, setSelectedChain] = useState<string>(
    evmBalances[0]?.chain.id ?? "ethereum",
  );
  const evmTotal = evmBalances
    .flatMap((balance) => balance.tokens)
    .reduce((sum, token) => sum + token.amount, 0);
  const solanaTotal = solanaBalance.tokens.reduce(
    (sum, token) => sum + token.amount,
    0,
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Donate to Glyph"
      titleId="donate-dialog-title"
    >
      <div className="mt-4 flex gap-1.5" aria-hidden="true">
        {[1, 2].map((value) => (
          <span
            key={value}
            className={cn(
              "h-0.5 flex-1 rounded-full transition-colors",
              step >= value ? "bg-brand" : "bg-foreground/10",
            )}
          />
        ))}
      </div>

      {step === 1 ? (
        <div className="mt-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Choose a network to get the address.
          </p>
          <div className="mt-4 space-y-2">
            <NetworkOption
              title="EVM networks"
              description="Ethereum, Base, Polygon, Arbitrum, and Optimism"
              balance={formatStablecoin(evmTotal)}
              icons={evmBalances.map((balance) => balance.chain.icon)}
              onClick={() => onSelectNetwork("evm")}
            />
            <NetworkOption
              title="Solana"
              description="USDC or USDT on Solana"
              balance={formatStablecoin(solanaTotal)}
              icons={["/chains/solana.svg"]}
              onClick={() => onSelectNetwork("solana")}
            />
            <NetworkOption
              title="Qubic"
              description="Send QU to the Glyph identity"
              balance={
                qubicBalance.error
                  ? "Unavailable"
                  : `${qubicBalance.formatted} QU`
              }
              icons={["/chains/qubic.svg"]}
              onClick={() => onSelectNetwork("qubic")}
            />
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <SiteIcon icon={AltArrowLeftIcon} size={13} />
            Back
          </button>

          {tab === "evm" ? (
            <EvmDonatePanel
              evmAddress={evmAddress}
              evmBalances={evmBalances}
              selectedChain={selectedChain}
              onSelectChain={setSelectedChain}
            />
          ) : tab === "solana" ? (
            <SolanaDonatePanel
              solanaAddress={solanaAddress}
              solanaBalance={solanaBalance}
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
                Send QU to this identity. Keep the transaction ID after you
                send.
              </p>
              <div className="mt-4 rounded-2xl bg-foreground/[0.04] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground">
                    Identity
                  </span>
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
        </>
      )}
    </Dialog>
  );
}

function BalancesDialog({
  open,
  onClose,
  evmAddress,
  solanaAddress,
  evmBalances,
  solanaBalance,
  qubicBalance,
  usdcTotal,
  usdtTotal,
  donatedStablecoins,
}: {
  open: boolean;
  onClose: () => void;
  evmAddress: string;
  solanaAddress: string;
  evmBalances: ChainBalance[];
  solanaBalance: SolanaBalance;
  qubicBalance: QubicBalance;
  usdcTotal: number;
  usdtTotal: number;
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
          USDT + USDC across EVM and Solana
        </p>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-foreground/[0.04] p-3">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <TokenIcon symbol="USDC" size={16} />
            USDC
          </span>
          <p className="mt-2 font-mono text-xl tracking-[-0.03em]">
            {formatStablecoin(usdcTotal)}
          </p>
        </div>
        <div className="rounded-2xl bg-foreground/[0.04] p-3">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <TokenIcon symbol="USDT" size={16} />
            USDT
          </span>
          <p className="mt-2 font-mono text-xl tracking-[-0.03em]">
            {formatStablecoin(usdtTotal)}
          </p>
        </div>
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
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <TokenIcon symbol={token.symbol} size={14} />
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

      <div className="mt-3 border-t border-foreground/10 pt-3">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm">
            <ChainIcon src="/chains/solana.svg" size={18} />
            Solana
          </span>
          <a
            href={`https://solscan.io/account/${solanaAddress}`}
            target="_blank"
            rel="noreferrer"
            aria-label="View Solana address"
            className="text-muted-foreground transition-colors hover:text-brand"
          >
            <SiteIcon icon={ArrowRightUpIcon} size={12} />
          </a>
        </div>
        {solanaBalance.error ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Unavailable right now.
          </p>
        ) : (
          <div className="mt-2 grid grid-cols-2 gap-4">
            {solanaBalance.tokens.map((token) => (
              <div
                key={token.symbol}
                className="flex items-baseline justify-between gap-3 font-mono text-xs"
              >
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <TokenIcon symbol={token.symbol} size={14} />
                  {token.symbol}
                </span>
                <span>{token.formatted}</span>
              </div>
            ))}
          </div>
        )}
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
        USDT and USDC are tracked across EVM networks and Solana. Other tokens
        can still be sent but are not listed here.
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
  solanaAddress,
  evmBalances,
  solanaBalance,
  qubicBalance,
  evmStablecoins,
  solanaStablecoins,
  usdcTotal,
  usdtTotal,
  donatedStablecoins,
}: DonationExperienceProps) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [donateStep, setDonateStep] = useState<DonateStep>(1);
  const [donateTab, setDonateTab] = useState<DonateTab>("evm");
  const [balancesOpen, setBalancesOpen] = useState(false);

  const closeDonate = useCallback(() => setDonateOpen(false), []);
  const closeBalances = useCallback(() => setBalancesOpen(false), []);

  const openDonate = (tab?: DonateTab) => {
    if (tab) {
      setDonateTab(tab);
      setDonateStep(2);
    } else {
      setDonateStep(1);
    }
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
            <SiteButton size="md" onClick={() => openDonate()}>
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
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <TokenIcon symbol="USDC" size={14} />
                {formatStablecoin(usdcTotal)} USDC
              </span>
              <span className="inline-flex items-center gap-1.5">
                <TokenIcon symbol="USDT" size={14} />
                {formatStablecoin(usdtTotal)} USDT
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container pb-16 md:pb-20">
        <div className="mx-auto grid max-w-5xl gap-3 md:grid-cols-2 lg:grid-cols-3">
          <DonationMethodCard
            title="EVM networks"
            description="One address on Ethereum, Base, Polygon, Arbitrum, and Optimism. Send USDC, USDT, or any other EVM asset."
            balance={`${formatStablecoin(evmStablecoins)} USDT + USDC`}
            icons={evmBalances.map((balance) => balance.chain.icon)}
            onClick={() => openDonate("evm")}
          />
          <DonationMethodCard
            title="Solana"
            description="Send USDC or USDT on Solana. Keep the transaction ID after you send."
            balance={`${formatStablecoin(solanaStablecoins)} USDT + USDC`}
            icons={["/chains/solana.svg"]}
            onClick={() => openDonate("solana")}
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

      <section className="site-container pb-16 md:pb-20">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 border-t border-foreground/10 pt-8">
          <div>
            <h2 className="font-display text-2xl leading-tight font-medium tracking-[-0.04em]">
              Official sponsor
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              {sponsors[0]?.note}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                aria-label={sponsor.name}
                className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={220}
                  height={72}
                  loading="eager"
                  className="h-12 w-auto object-contain invert"
                />
              </a>
            ))}
          </div>
        </div>
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
        step={donateStep}
        onSelectNetwork={(tab) => {
          setDonateTab(tab);
          setDonateStep(2);
        }}
        onBack={() => setDonateStep(1)}
        tab={donateTab}
        evmAddress={evmAddress}
        qubicIdentity={qubicIdentity}
        solanaAddress={solanaAddress}
        evmBalances={evmBalances}
        solanaBalance={solanaBalance}
        qubicBalance={qubicBalance}
      />
      <BalancesDialog
        open={balancesOpen}
        onClose={closeBalances}
        evmAddress={evmAddress}
        solanaAddress={solanaAddress}
        evmBalances={evmBalances}
        solanaBalance={solanaBalance}
        qubicBalance={qubicBalance}
        usdcTotal={usdcTotal}
        usdtTotal={usdtTotal}
        donatedStablecoins={donatedStablecoins}
      />
    </>
  );
}
