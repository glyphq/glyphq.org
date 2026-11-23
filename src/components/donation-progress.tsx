"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ANALYTICS_URL } from "../lib/analytics";
import { DONATION_TARGET_USD } from "../lib/donations";

interface Props {
  target?: number;
}

interface SupportProgress {
  receivedQu: number;
  priceUsdt: number;
  receivedUsd: number;
  target: number;
  percent: number;
  label: string;
}

const quFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: value > 0 && value < 1 ? 6 : 2,
  }).format(value);

export default function DonationProgress({ target = DONATION_TARGET_USD }: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [progress, setProgress] = useState<SupportProgress | null>(null);

  const load = useCallback(async () => {
    setStatus((current) => (current === "ready" ? current : "loading"));
    try {
      const response = await fetch(`${ANALYTICS_URL}/support?ttl=120`);
      if (!response.ok) throw new Error("Support analytics request failed");
      const data = (await response.json()) as { progress?: SupportProgress };
      if (!data.progress) throw new Error("Support analytics returned no progress");
      setProgress(data.progress);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), 2 * 60_000);
    return () => window.clearInterval(timer);
  }, [load]);

  const receivedUsd = progress?.receivedUsd ?? 0;
  const percent = progress?.percent ?? 0;
  const fill = percent > 0 ? Math.max(percent, 0.4) : 0;
  const progressLabel = progress?.label ?? "—";
  const isLoading = status === "loading";

  return (
    <div className="w-full" aria-busy={isLoading}>
      {isLoading ? (
        <div className="flex items-center justify-center gap-4" aria-hidden="true">
          <span className="h-3 w-36 animate-pulse rounded-full bg-ink/10" />
          <span className="h-3 w-12 animate-pulse rounded-full bg-ink/10" />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4 font-mono text-xs text-muted">
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
      </div>

      {isLoading ? (
        <div className="mt-2" aria-hidden="true">
          <span className="block h-3 w-32 animate-pulse rounded-full bg-ink/10" />
        </div>
      ) : (
        <div className="mt-2 text-center text-xs text-muted">
          {status === "error"
            ? "Donation history unavailable"
            : `${quFormatter.format(progress?.receivedQu ?? 0)} QU received`}
        </div>
      )}
    </div>
  );
}
