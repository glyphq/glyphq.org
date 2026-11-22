"use client";

import { RefreshIcon } from "@solar-icons/react/linear/refresh";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const API = "https://api.glyphq.org";

interface Props {
  identity: string;
  target?: number;
}

interface Snapshot {
  receivedQu: number;
  balanceQu: number;
  priceUsdt: number;
  updatedAt: Date | null;
}

const quFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: value > 0 && value < 1 ? 6 : 2,
  }).format(value);

export default function DonationProgress({ identity, target = 2000 }: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [snapshot, setSnapshot] = useState<Snapshot>({
    receivedQu: 0,
    balanceQu: 0,
    priceUsdt: 0,
    updatedAt: null,
  });

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
      const balanceQu = Number(entity?.balance ?? 0);
      const priceUsdt = Number(price.data?.price_usdt ?? 0);

      if (!Number.isFinite(receivedQu) || !Number.isFinite(priceUsdt)) {
        throw new Error("Glyph API returned an invalid balance");
      }

      setSnapshot({ receivedQu, balanceQu, priceUsdt, updatedAt: new Date() });
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
  const updated = snapshot.updatedAt
    ? snapshot.updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-8 py-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-muted">Monthly target</p>
          <p className="mt-2 text-4xl font-medium tracking-tight text-ink">{formatUsd(target)}</p>
        </div>
        <div className="md:text-right" aria-live="polite">
          <p className="text-sm text-muted">Total received</p>
          <p className="mt-2 text-4xl font-medium tracking-tight text-ink">
            {status === "ready" ? formatUsd(receivedUsd) : "..."}
          </p>
          <p className="mt-1 text-sm text-muted">
            {quFormatter.format(snapshot.receivedQu)} QU received
          </p>
        </div>
      </div>

      <div
        className="mt-8 h-3 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-label="Donation progress"
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

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span>
          {status === "error"
            ? "Live balance unavailable"
            : `${progressLabel} of the monthly target`}
        </span>
        <span>
          {status === "ready" && updated
            ? `Updated ${updated} · ${quFormatter.format(snapshot.balanceQu)} QU balance`
            : status === "loading"
              ? "Reading Glyph API..."
              : "Try again in a moment"}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <motion.button
          type="button"
          onClick={() => void load()}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-display text-sm font-semibold text-ink transition-colors duration-150 hover:bg-ink/10"
        >
          <RefreshIcon size={16} aria-hidden="true" />
          Refresh
        </motion.button>
        <span className="text-xs text-muted">
          Progress uses incoming QU to the Qubic donation identity.
        </span>
      </div>
    </div>
  );
}
