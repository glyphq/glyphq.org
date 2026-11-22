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

interface Transaction {
  amount: number;
  destination: string;
  status: string;
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

export default function DonationProgress({ identity, target = 2000 }: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [snapshot, setSnapshot] = useState<Snapshot>({ receivedQu: 0, priceUsdt: 0 });

  const load = useCallback(async () => {
    setStatus((current) => (current === "ready" ? current : "loading"));
    try {
      const [transactionsResponse, priceResponse] = await Promise.all([
        fetch(`${API}/v1/identities/${encodeURIComponent(identity)}/transactions?limit=200`),
        fetch(`${API}/v1/prices/latest`),
      ]);
      if (!transactionsResponse.ok || !priceResponse.ok) {
        throw new Error("Glyph API request failed");
      }

      const transactions = (await transactionsResponse.json()) as { data?: Transaction[] };
      const price = (await priceResponse.json()) as { data?: { price_usdt?: number } };
      const receivedQu = (transactions.data ?? [])
        .filter(
          (transaction) => transaction.destination === identity && transaction.status === "success",
        )
        .reduce((sum, transaction) => sum + Number(transaction.amount ?? 0), 0);
      const priceUsdt = Number(price.data?.price_usdt ?? 0);

      if (!Number.isFinite(receivedQu) || !Number.isFinite(priceUsdt)) {
        throw new Error("Glyph API returned invalid donation data");
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
  const isLoading = status === "loading";

  return (
    <div className="w-full" aria-busy={isLoading}>
      {isLoading ? (
        <div className="flex items-center justify-between gap-4" aria-hidden="true">
          <span className="h-3 w-36 animate-pulse rounded-full bg-ink/10" />
          <span className="h-3 w-12 animate-pulse rounded-full bg-ink/10" />
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted">
          <span>
            {status === "ready" ? formatUsd(receivedUsd) : "—"}
            <span className="text-muted"> / {formatUsd(target)}</span>
          </span>
          <span>{status === "ready" ? progressLabel : "—"}</span>
        </div>
      )}

      <div className="relative mt-2">
        <div
          className="h-2 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-label="Donation progress"
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

      {isLoading ? (
        <div className="mt-2 flex items-center justify-between gap-4" aria-hidden="true">
          <span className="h-3 w-32 animate-pulse rounded-full bg-ink/10" />
          <span className="h-3 w-16 animate-pulse rounded-full bg-ink/10" />
        </div>
      ) : (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <span>
            {status === "error"
              ? "Donation history unavailable"
              : `${quFormatter.format(snapshot.receivedQu)} QU received`}
          </span>
          <span>
            {status === "ready" && (progress >= 100 ? "Goal reached" : `Next: ${nextMilestone}%`)}
          </span>
        </div>
      )}
    </div>
  );
}
