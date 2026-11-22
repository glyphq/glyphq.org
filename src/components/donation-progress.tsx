"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const API = "https://api.glyphq.org";

interface Props {
  identity: string;
  target?: number;
}

interface Snapshot {
  receivedQu: number;
  priceUsdt: number;
}

const quFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const milestones = [25, 50, 75, 100];

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: value > 0 && value < 1 ? 6 : 2,
  }).format(value);

const statusFor = (progress: number) => {
  if (progress >= 100) return "Funded";
  if (progress >= 75) return "Almost there";
  if (progress >= 50) return "Halfway";
  if (progress >= 25) return "Building";
  return "Kickoff";
};

export default function DonationProgress({ identity, target = 2000 }: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [snapshot, setSnapshot] = useState<Snapshot>({ receivedQu: 0, priceUsdt: 0 });

  const load = useCallback(async () => {
    setStatus((current) => (current === "ready" ? current : "loading"));
    try {
      const [walletResponse, priceResponse] = await Promise.all([
        fetch(`${API}/v1/wallets/${identity}`),
        fetch(`${API}/v1/prices/latest`),
      ]);
      if (!walletResponse.ok || !priceResponse.ok) throw new Error("Glyph API request failed");

      const wallet = (await walletResponse.json()) as {
        data?: { entity?: { balance?: number; incoming_amount?: number } };
      };
      const price = (await priceResponse.json()) as { data?: { price_usdt?: number } };
      const entity = wallet.data?.entity;
      const receivedQu = Number(entity?.incoming_amount ?? entity?.balance ?? 0);
      const priceUsdt = Number(price.data?.price_usdt ?? 0);

      if (!Number.isFinite(receivedQu) || !Number.isFinite(priceUsdt)) {
        throw new Error("Glyph API returned an invalid balance");
      }

      setSnapshot({ receivedQu, priceUsdt });
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [identity]);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), 60_000);
    return () => window.clearInterval(timer);
  }, [load]);

  const receivedUsd = snapshot.receivedQu * snapshot.priceUsdt;
  const progress = target > 0 ? Math.min(100, (receivedUsd / target) * 100) : 0;
  const fill = progress > 0 ? Math.max(progress, 0.4) : 0;
  const progressLabel = progress > 0 && progress < 0.1 ? "<0.1%" : `${progress.toFixed(1)}%`;
  const nextMilestone = milestones.find((milestone) => progress < milestone) ?? 100;
  const stateLabel = status === "ready" ? statusFor(progress) : "Live";

  return (
    <div className="w-full rounded-2xl bg-ink/[0.04] p-4 md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Development window
            </p>
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-accent-soft">
              {stateLabel}
            </span>
          </div>
          <p className="mt-1 font-mono text-sm text-ink">
            {status === "ready" ? formatUsd(receivedUsd) : "..."}
            <span className="text-muted"> / {formatUsd(target)}</span>
          </p>
        </div>
        <p className="font-mono text-xs text-muted">{status === "ready" ? progressLabel : "..."}</p>
      </div>

      <div className="relative mt-3">
        <div
          className="h-2 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-label="Development window progress"
          aria-valuetext={progressLabel}
          aria-valuemin={0}
          aria-valuemax={target}
          aria-valuenow={Math.round(receivedUsd)}
        >
          <motion.div
            className="h-full rounded-full bg-accent-soft"
            initial={false}
            animate={{ width: `${fill}%` }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center">
          {[25, 50, 75].map((milestone) => (
            <span
              key={milestone}
              className={`absolute size-1.5 -translate-x-1/2 rounded-full ${
                progress >= milestone ? "bg-night/60" : "bg-ink/25"
              }`}
              style={{ left: `${milestone}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>
          {status === "error"
            ? "Live balance unavailable"
            : status === "loading"
              ? "Reading Glyph API..."
              : `${quFormatter.format(snapshot.receivedQu)} QU received`}
        </span>
        <span>
          {status === "ready" ? (progress >= 100 ? "Goal reached" : `Next: ${nextMilestone}%`) : ""}
        </span>
      </div>
    </div>
  );
}
