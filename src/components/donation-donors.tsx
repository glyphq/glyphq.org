"use client";

import { CrownDiamond } from "@gravity-ui/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { ANALYTICS_URL } from "../lib/analytics";
import IdentityAvatar from "./identity-avatar";

const EXPLORER = "https://explorer.glyphq.org";

interface Profile {
  identity: string;
  displayName: string;
}

interface StaticSupporter {
  amount: string;
  ariaLabel: string;
  href: string;
  image?: string;
  label: string;
  timestamp: string;
}

interface Props {
  profiles?: Profile[];
  staticSupporter?: StaticSupporter;
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

export default function DonationDonors({ profiles = [], staticSupporter }: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(`${ANALYTICS_URL}/support?ttl=120`);
        if (!response.ok) throw new Error("Support analytics request failed");
        const payload = (await response.json()) as { donations?: Donation[] };
        if (!active) return;
        setDonations(payload.donations ?? []);
        setStatus("ready");
      } catch {
        if (active) setStatus("error");
      }
    };

    void load();
    const timer = window.setInterval(() => void load(), 2 * 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const staticChip = staticSupporter ? (
    <a
      href={staticSupporter.href}
      target="_blank"
      rel="noreferrer"
      aria-label={staticSupporter.ariaLabel}
      className="mb-2.5 grid w-fit max-w-full break-inside-avoid grid-cols-1 items-center md:mb-0"
    >
      <span className="z-10 w-fit max-w-[calc(16ch+1.5rem)] justify-self-start truncate rounded-t-[4px] bg-surface px-3 py-1 text-left font-mono text-[11px] tracking-[0.04em] text-muted">
        {staticSupporter.label}
      </span>
      <span className="flex w-full items-center gap-2.5 rounded-tl-none rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px] bg-surface py-1.5 pl-1.5 pr-4 text-sm">
        {staticSupporter.image ? (
          <span className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink/5 ring-1 ring-ink/10">
            <img
              src={staticSupporter.image}
              alt=""
              width="28"
              height="28"
              className="size-full object-contain grayscale"
            />
          </span>
        ) : (
          <IdentityAvatar value={staticSupporter.label} size={28} />
        )}
        <span className="flex flex-col">
          <span className="text-ink">{staticSupporter.amount}</span>
          <span className="text-xs text-muted">{staticSupporter.timestamp}</span>
        </span>
      </span>
    </a>
  ) : null;

  if (status === "loading") {
    return (
      <div className="mt-5 flex flex-wrap justify-center gap-2" aria-busy="true">
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
    return (
      <p className="mt-4 text-center text-sm text-muted">Donor history is unavailable right now.</p>
    );
  }

  if (!donations.length) {
    return staticChip ? (
      <div className="mt-5 columns-2 gap-2.5 md:flex md:flex-wrap md:justify-center">
        {staticChip}
      </div>
    ) : null;
  }

  const names = new Map(profiles.map((profile) => [profile.identity, profile.displayName]));
  const byAmount = [...donations].sort((a, b) => b.amount - a.amount);
  const podium = byAmount.slice(0, 3);
  const recent = byAmount
    .slice(3)
    .sort((a, b) => moment(b.timestamp).valueOf() - moment(a.timestamp).valueOf());
  const ordered = [...podium, ...recent];

  return (
    <div className="mt-5 columns-2 gap-2.5 md:flex md:flex-wrap md:justify-center">
      {ordered.map((donation, index) => {
        const name = names.get(donation.identity) ?? shortIdentity(donation.identity);
        const chipLabel = name.length > 16 ? `${name.slice(0, 16)}…` : name;
        const isPodium = index < 3;
        const chipTone =
          index === 0
            ? "bg-accent/20"
            : index === 1
              ? "bg-accent/10"
              : index === 2
                ? "bg-ink/5"
                : "bg-surface";

        return (
          <a
            key={donation.hash}
            href={`${EXPLORER}/transactions/${donation.hash}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} donated ${quFormatter.format(donation.amount)} QU.${index === 0 ? " Top donation." : ""} Open transaction.`}
            title={donation.identity}
            className="relative mb-2.5 grid w-fit max-w-full break-inside-avoid grid-cols-1 items-center md:mb-0"
          >
            <span className="relative z-10 w-fit max-w-[calc(16ch+1.5rem)] justify-self-start">
              <span
                className={`block truncate rounded-t-[4px] px-3 py-1 text-left font-mono text-[11px] tracking-[0.04em] text-muted ${chipTone}`}
              >
                {chipLabel}
              </span>
            </span>
            <span
              className={`flex w-full items-center gap-2.5 rounded-tl-none rounded-tr-[4px] rounded-br-[4px] rounded-bl-[4px] py-1.5 pl-1.5 pr-4 text-sm ${chipTone}`}
            >
              <span className="relative shrink-0">
                {index === 0 && (
                  <span
                    className="absolute inset-0 z-20 flex items-center justify-center text-accent-soft"
                    aria-hidden="true"
                  >
                    <CrownDiamond width={12} height={12} aria-hidden="true" />
                  </span>
                )}
                <IdentityAvatar value={donation.identity} size={28} />
              </span>
              <span className="flex flex-col">
                <span className={isPodium ? "text-accent-soft" : "text-ink"}>
                  {quFormatter.format(donation.amount)} QU
                </span>
                <span className="text-xs text-muted">{moment(donation.timestamp).fromNow()}</span>
              </span>
            </span>
          </a>
        );
      })}
      {staticChip}
    </div>
  );
}
