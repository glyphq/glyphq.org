"use client";

import { useEffect, useState } from "react";

const API = "https://api.glyphq.org";

interface Props {
  identity: string;
}

interface Transaction {
  source: string;
  destination: string;
  amount: number;
  status: string;
}

interface Donor {
  identity: string;
  total: number;
}

const quFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

const shortIdentity = (identity: string) =>
  identity.length > 14 ? `${identity.slice(0, 6)}…${identity.slice(-4)}` : identity;

export default function DonationDonors({ identity }: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(
          `${API}/v1/identities/${encodeURIComponent(identity)}/transactions?limit=100`,
        );
        if (!response.ok) throw new Error("Glyph API request failed");

        const payload = (await response.json()) as { data?: Transaction[] };
        const totals = new Map<string, number>();

        for (const transaction of payload.data ?? []) {
          if (transaction.destination !== identity || transaction.status !== "success") continue;
          const amount = Number(transaction.amount);
          if (!Number.isFinite(amount) || amount <= 0) continue;
          totals.set(transaction.source, (totals.get(transaction.source) ?? 0) + amount);
        }

        if (!active) return;
        setDonors(
          Array.from(totals, ([source, total]) => ({ identity: source, total })).sort(
            (a, b) => b.total - a.total,
          ),
        );
        setStatus("ready");
      } catch {
        if (active) setStatus("error");
      }
    };

    void load();
    const timer = window.setInterval(() => void load(), 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [identity]);

  if (status === "loading") {
    return (
      <div className="mt-5 flex flex-wrap gap-2" aria-busy="true">
        {[84, 112, 96].map((width) => (
          <span
            key={width}
            className="h-7 animate-pulse rounded-full bg-ink/10"
            style={{ width }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return <p className="mt-4 text-sm text-muted">Donor history is unavailable right now.</p>;
  }

  if (!donors.length) {
    return <p className="mt-4 text-sm text-muted">No indexed donations yet.</p>;
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {donors.map((donor) => (
        <a
          key={donor.identity}
          href={`https://explorer.glyphq.org/accounts/${donor.identity}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`${donor.identity} donated ${quFormatter.format(donor.total)} QU`}
          title={donor.identity}
          className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs transition-colors duration-150 hover:bg-ink/5"
        >
          <span className="font-mono text-muted">{shortIdentity(donor.identity)}</span>
          <span className="text-ink">{quFormatter.format(donor.total)} QU</span>
        </a>
      ))}
    </div>
  );
}
