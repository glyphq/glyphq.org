"use client";

import {
  AddCircleIcon,
  AltArrowLeftIcon,
  ArrowRightIcon,
  ArrowRightUpIcon,
  CloseIcon,
  CrownStarIcon,
  HandHeartIcon,
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
import { AccentBox } from "@/components/ascii/accent-box";
import { CopyButton } from "@/components/ui/copy-button";
import { SiteButton, SiteButtonLink } from "@/components/ui/site-button";
import { SiteIcon } from "@/components/ui/site-icon";
import type { ChainBalance, QubicBalance } from "@/lib/donations";
import { siteConfig } from "@/lib/site";
import { type Sponsor, sponsors, sponsorThresholds } from "@/lib/sponsors";
import { cn } from "@/lib/utils";

type DonateTab = "evm" | "solana" | "qubic";
type DonateStep = 1 | 2;

type DonationExperienceProps = {
  evmAddress: string;
  qubicIdentity: string;
  solanaAddress: string;
  evmQr: string;
  solanaQr: string;
  qubicQr: string;
  evmBalances: ChainBalance[];
  qubicBalance: QubicBalance;
  evmStablecoins: number;
  solanaStablecoins: number;
  usdcTotal: number;
  usdtTotal: number;
  donatedUsd: number;
};

const stablecoinFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const wholeUsdFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
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

function QrCode({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="aspect-square w-full max-w-48 rounded-lg bg-[#f8f7f2] p-2">
        <Image
          src={src}
          alt={`QR code for ${label}`}
          width={192}
          height={192}
          unoptimized
          className="h-full w-full object-contain"
        />
      </div>
      <span className="mt-2 text-[0.65rem] text-muted-foreground">
        Scan to donate
      </span>
    </div>
  );
}

function AddressField({ value, label }: { value: string; label: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  });

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        readOnly
        rows={1}
        value={value}
        aria-label={label}
        spellCheck={false}
        onFocus={(event) => event.currentTarget.select()}
        className="w-full resize-none overflow-hidden rounded-2xl bg-foreground/[0.04] p-4 pr-12 font-mono text-xs leading-relaxed break-all text-foreground/85 outline-none transition-colors focus:bg-foreground/[0.06] focus:ring-2 focus:ring-ring"
      />
      <CopyButton
        value={value}
        label={label}
        iconOnly
        className="absolute top-2 right-2"
      />
    </div>
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
              layout="size"
              className="relative z-10 max-h-[min(90svh,46rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-3xl bg-popover p-5 shadow-2xl shadow-black/50 sm:p-6"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={{
                duration: 0.24,
                ease: [0.22, 1, 0.36, 1],
                layout: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
              }}
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

function EvmDonatePanel({
  evmAddress,
  evmQr,
  evmBalances,
  selectedChain,
  onSelectChain,
}: {
  evmAddress: string;
  evmQr: string;
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

      <div className="mt-4 flex flex-col gap-4">
        <QrCode src={evmQr} label="EVM address" />
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <ChainIcon src={selected.chain.icon} size={14} />
            {selected.chain.name} address
          </p>
          <AddressField value={evmAddress} label="EVM address" />
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">
        Send only USDC or USDT on {selected.chain.name}. Transfers are final.
      </p>
    </div>
  );
}

function SolanaDonatePanel({
  solanaAddress,
  solanaQr,
}: {
  solanaAddress: string;
  solanaQr: string;
}) {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-4">
        <QrCode src={solanaQr} label="Solana address" />
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <ChainIcon src="/chains/solana.svg" size={14} />
            Solana address
          </p>
          <AddressField value={solanaAddress} label="Solana address" />
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">
        Send only USDC or USDT on Solana. Transfers are final.
      </p>
    </div>
  );
}

function NetworkOption({
  title,
  description,
  icons,
  onClick,
}: {
  title: string;
  description: string;
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
      <SiteIcon
        icon={ArrowRightIcon}
        size={13}
        className="shrink-0 text-muted-foreground"
      />
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
  evmQr,
  solanaQr,
  qubicQr,
  evmBalances,
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
  evmQr: string;
  solanaQr: string;
  qubicQr: string;
  evmBalances: ChainBalance[];
}) {
  const [selectedChain, setSelectedChain] = useState<string>(
    evmBalances[0]?.chain.id ?? "ethereum",
  );
  const previousStep = useRef(step);
  const direction = step >= previousStep.current ? 1 : -1;

  useEffect(() => {
    previousStep.current = step;
  }, [step]);

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

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`step-${step}`}
          initial={{ opacity: 0, x: direction * 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -18 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 1 ? (
            <div className="mt-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Choose a network to get the address.
              </p>
              <div className="mt-4 space-y-2">
                <NetworkOption
                  title="EVM networks"
                  description="Ethereum, Base, Polygon, Arbitrum, and Optimism"
                  icons={["/chains/ethereum.svg"]}
                  onClick={() => onSelectNetwork("evm")}
                />
                <NetworkOption
                  title="Solana"
                  description="USDC or USDT on Solana"
                  icons={["/chains/solana.svg"]}
                  onClick={() => onSelectNetwork("solana")}
                />
                <NetworkOption
                  title="Qubic"
                  description="Send QU to the Glyph identity"
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
                  evmQr={evmQr}
                  evmBalances={evmBalances}
                  selectedChain={selectedChain}
                  onSelectChain={setSelectedChain}
                />
              ) : tab === "solana" ? (
                <SolanaDonatePanel
                  solanaAddress={solanaAddress}
                  solanaQr={solanaQr}
                />
              ) : (
                <div className="mt-5">
                  <div className="mt-4 flex flex-col gap-4">
                    <QrCode src={qubicQr} label="Qubic identity" />
                    <div>
                      <p className="mb-2 text-xs text-muted-foreground">
                        Qubic identity
                      </p>
                      <AddressField
                        value={qubicIdentity}
                        label="Qubic identity"
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground text-pretty">
                    Send only QU on Qubic. Transfers are final.
                  </p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const gold = "color-mix(in oklab, var(--brand) 35%, #d4a64a)";
  const large = sponsor.donatedUsd >= 2000;
  const medium = sponsor.donatedUsd >= 1000;
  const small = sponsor.donatedUsd >= 500;
  const goldCard = sponsor.gold === true;

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noreferrer"
      aria-label={sponsor.name}
      className={cn(
        "group relative mb-3 flex break-inside-avoid flex-col items-center justify-center rounded-3xl bg-card p-6 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        !goldCard && "hover:bg-foreground/[0.04]",
        large && "min-h-72 p-8",
        medium && !large && "min-h-60",
        small && !medium && "min-h-48",
        !small && "min-h-40",
      )}
      style={goldCard ? { backgroundColor: gold, color: "#0a0a0a" } : undefined}
    >
      {sponsor.crown ? (
        <>
          {!goldCard ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] border"
              style={{ borderColor: gold, opacity: 0.4 }}
            />
          ) : null}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-4"
            style={{ color: goldCard ? "#0a0a0a" : gold }}
          >
            <SiteIcon icon={CrownStarIcon} size={large ? 22 : 18} />
          </span>
        </>
      ) : null}
      <Image
        src={sponsor.logo}
        alt={sponsor.name}
        width={220}
        height={72}
        loading="eager"
        className={cn(
          "w-auto object-contain transition-opacity",
          goldCard ? "opacity-100" : "opacity-80 group-hover:opacity-100",
          large ? "max-h-16" : "max-h-10",
          sponsor.invert && !goldCard && "invert",
        )}
      />
      <p
        className={cn(
          "mt-3 leading-relaxed text-pretty",
          goldCard ? "text-black" : "text-muted-foreground",
          large ? "max-w-sm text-sm" : "max-w-[16rem] text-xs",
        )}
      >
        {sponsor.description}
      </p>
      <span
        className="mt-3 rounded-full bg-[#0a0a0a] px-2.5 py-1 text-[0.65rem]"
        style={{ color: gold }}
      >
        {sponsor.donationLabel} donated
      </span>
    </a>
  );
}

function SponsorPlaceholder({
  title,
  description,
  threshold,
  size = "md",
}: {
  title: string;
  description?: string;
  threshold: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "min-h-32",
    md: "min-h-44",
    lg: "min-h-56",
  };

  return (
    <div className="mb-3 break-inside-avoid rounded-3xl border border-dashed border-foreground/15 p-6">
      <div
        className={cn(
          "flex flex-col items-center justify-center text-center",
          sizes[size],
        )}
      >
        <SiteIcon
          icon={AddCircleIcon}
          size={20}
          className="text-muted-foreground/60"
        />
        <p className="mt-3 text-sm font-medium">{title}</p>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        ) : null}
        <p className="mt-1 text-xs text-muted-foreground">
          ${wholeUsdFormatter.format(threshold)}+ USD donated
        </p>
      </div>
    </div>
  );
}

function DonationMethodCard({
  title,
  description,
  balance,
  balanceNote,
  icons,
  onClick,
}: {
  title: string;
  description: string;
  balance: string;
  balanceNote?: string;
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
        <div>
          <p className="font-mono text-2xl tracking-[-0.04em]">{balance}</p>
          {balanceNote ? (
            <p className="mt-1 text-xs text-muted-foreground">{balanceNote}</p>
          ) : null}
        </div>
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
  evmQr,
  solanaQr,
  qubicQr,
  evmBalances,
  qubicBalance,
  evmStablecoins,
  solanaStablecoins,
  usdcTotal,
  usdtTotal,
  donatedUsd,
}: DonationExperienceProps) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [donateStep, setDonateStep] = useState<DonateStep>(1);
  const [donateTab, setDonateTab] = useState<DonateTab>("evm");

  const closeDonate = useCallback(() => setDonateOpen(false), []);

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
              <SiteIcon icon={HandHeartIcon} size={16} />
              Donate
            </SiteButton>
          </div>
          <div className="mt-10">
            <p className="font-display text-5xl leading-none font-medium tracking-[-0.055em]">
              {formatStablecoin(donatedUsd)}{" "}
              <span className="text-lg tracking-[-0.03em] text-muted-foreground">
                USD
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
              <span className="inline-flex items-center gap-1.5">
                <ChainIcon src="/chains/qubic.svg" size={14} />
                {qubicBalance.formatted} QU
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container pb-16 md:pb-20">
        <div className="mx-auto grid max-w-5xl gap-3 md:grid-cols-2 lg:grid-cols-3">
          <DonationMethodCard
            title="EVM networks"
            description="One address on Ethereum, Base, Polygon, Arbitrum, and Optimism. Send USDC or USDT."
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
            balanceNote={
              qubicBalance.error
                ? undefined
                : `≈ ${formatStablecoin(qubicBalance.usdValue)} USD`
            }
            icons={["/chains/qubic.svg"]}
            onClick={() => openDonate("qubic")}
          />
        </div>
      </section>

      <section
        id="sponsors"
        aria-labelledby="sponsors-heading"
        className="site-container scroll-mt-28 pb-16 md:pb-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="pt-8">
            <h2
              id="sponsors-heading"
              className="font-display text-3xl leading-[1] font-semibold tracking-[-0.05em]"
            >
              Sponsors
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
              People and projects backing Glyph.
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
              {`People at $${wholeUsdFormatter.format(sponsorThresholds.person)}+ USD. Organizations at $${wholeUsdFormatter.format(sponsorThresholds.organization)}+ USD.`}
            </p>
          </div>

          <div className="mt-6 columns-1 gap-3 sm:columns-2 lg:columns-3">
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} />
            ))}
            <SponsorPlaceholder
              title="Person spot"
              description="An individual supporter."
              threshold={sponsorThresholds.person}
              size="sm"
            />
            <SponsorPlaceholder
              title="Organization spot"
              description="A team or project."
              threshold={sponsorThresholds.organization}
              size="lg"
            />
            <SponsorPlaceholder
              title="Person spot"
              threshold={sponsorThresholds.person}
              size="md"
            />
            <SponsorPlaceholder
              title="Organization spot"
              threshold={sponsorThresholds.organization}
              size="sm"
            />
          </div>
        </div>
      </section>

      <section className="site-container pb-20 md:pb-24">
        <div className="mx-auto max-w-5xl pt-6">
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
        evmQr={evmQr}
        solanaQr={solanaQr}
        qubicQr={qubicQr}
        evmBalances={evmBalances}
      />
    </>
  );
}
