"use client";

import { useEffect, useState } from "react";
import IdentityAvatar from "./identity-avatar";

const API = "https://api.glyphq.org";
const EXPLORER = "https://explorer.glyphq.org";

interface Profile {
  identity: string;
  displayName: string;
}

interface Props {
  identity: string;
  profiles?: Profile[];
}

interface Transaction {
  amount: number;
  destination: string;
  hash: string;
  source: string;
  status: string;
}

interface Donation {
  amount: number;
  hash: string;
  identity: string;
}

const quFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

const shortIdentity = (identity: string) =>
  identity.length > 14 ? `${identity.slice(0, 6)}…${identity.slice(-4)}` : identity;

export default function DonationDonors({ identity, profiles = [] }: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(
          `${API}/v1/identities/${encodeURIComponent(identity)}/transactions?limit=200`,
        );
        if (!response.ok) throw new Error("Glyph API request failed");

        const payload = (await response.json()) as { data?: Transaction[] };
        const next = (payload.data ?? [])
          .filter((transaction) => transaction.destination === identity)
          .filter((transaction) => transaction.status === "success")
          .map((transaction) => ({
            amount: Number(transaction.amount),
            hash: transaction.hash,
            identity: transaction.source,
          }))
          .filter((donation) => Number.isFinite(donation.amount) && donation.amount > 0);

        if (!active) return;
        setDonations(next);
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

  if (!donations.length) {
    return null;
  }

  const names = new Map(profiles.map((profile) => [profile.identity, profile.displayName]));

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {donations.map((donation) => {
        const name = names.get(donation.identity) ?? shortIdentity(donation.identity);

        return (
          <a
            key={donation.hash}
            href={`${EXPLORER}/transactions/${donation.hash}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} donated ${quFormatter.format(donation.amount)} QU. Open transaction.`}
            title={donation.identity}
            className="inline-flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 text-xs transition-colors duration-150 hover:bg-ink/5"
          >
            <IdentityAvatar value={donation.identity} size={22} />
            <span className="max-w-[11rem] truncate text-muted">{name}</span>
            <span className="text-ink">{quFormatter.format(donation.amount)} QU</span>
          </a>
        );
      })}
    </div>
  );
}
