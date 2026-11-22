"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import IdentityAvatar from "./identity-avatar";

const API = "https://api.glyphq.org";
const EXPLORER = "https://explorer.glyphq.org";

interface Profile {
  identity: string;
  displayName: string;
}

interface StaticSupporter {
  amount: string;
  ariaLabel: string;
  href: string;
  label: string;
  timestamp: string;
}

interface Props {
  identity: string;
  profiles?: Profile[];
  staticSupporter?: StaticSupporter;
}

interface Transaction {
  amount: number;
  destination: string;
  hash: string;
  source: string;
  status: string;
  timestamp: string;
}

interface Donation {
  amount: number;
  hash: string;
  identity: string;
  timestamp: string;
}

const quFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

const shortIdentity = (identity: string) =>
  identity.length > 14 ? `${identity.slice(0, 6)}…${identity.slice(-4)}` : identity;

export default function DonationDonors({ identity, profiles = [], staticSupporter }: Props) {
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
            timestamp: transaction.timestamp,
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

  const staticChip = staticSupporter ? (
    <a
      href={staticSupporter.href}
      target="_blank"
      rel="noreferrer"
      aria-label={staticSupporter.ariaLabel}
      className="inline-flex w-fit items-center rounded-full bg-surface px-4 py-1.5 text-sm transition-colors duration-150 hover:bg-ink/5"
    >
      <span className="flex flex-col">
        <span className="flex items-baseline gap-2">
          <span className="text-muted">{staticSupporter.label}</span>
          <span className="text-ink">{staticSupporter.amount}</span>
        </span>
        <span className="text-xs text-muted">{staticSupporter.timestamp}</span>
      </span>
    </a>
  ) : null;

  if (status === "loading") {
    return (
      <div className="mt-5 flex flex-wrap gap-2" aria-busy="true">
        {staticChip}
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
    return staticChip ? <div className="mt-5 flex flex-wrap gap-2.5">{staticChip}</div> : null;
  }

  const names = new Map(profiles.map((profile) => [profile.identity, profile.displayName]));

  return (
    <div className="mt-5 flex flex-wrap gap-2.5">
      {staticChip}
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
            className="inline-flex w-fit items-center gap-2.5 rounded-full bg-surface py-1.5 pl-1.5 pr-4 text-sm transition-colors duration-150 hover:bg-ink/5"
          >
            <IdentityAvatar value={donation.identity} size={28} />
            <span className="flex min-w-0 flex-col">
              <span className="flex items-baseline gap-2">
                <span className="max-w-[12rem] truncate text-muted">{name}</span>
                <span className="text-ink">{quFormatter.format(donation.amount)} QU</span>
              </span>
              <span className="text-xs text-muted">{moment(donation.timestamp).fromNow()}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
