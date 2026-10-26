export type SponsorAsset = "QU" | "USDT";

export type SponsorshipTierId =
  | "supporter"
  | "builder"
  | "sustainer"
  | "principal";

export type SponsorshipTier = {
  id: SponsorshipTierId;
  name: string;
  thresholdUsdt: number;
  summary: string;
  benefits: string[];
};

export type SponsorTransfer = {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  sponsor: string;
  asset: SponsorAsset;
  /** Exact display amount. Do not round on-chain values. */
  amount: string;
  tierId: SponsorshipTierId;
  /** Full transaction hash. */
  transaction: string;
  transactionUrl?: string;
};

/**
 * PLACEHOLDER THRESHOLDS.
 * These numbers are not published business terms. Replace them before the page
 * is made indexable. Each threshold is the USDT value of a confirmed
 * sponsorship; QU transfers count at their USDT value on the day they confirm.
 */
export const sponsorshipTiers: SponsorshipTier[] = [
  {
    id: "supporter",
    name: "Supporter",
    thresholdUsdt: 500, // PLACEHOLDER THRESHOLD
    summary: "For individuals who want to keep the desktop wallet moving.",
    benefits: [
      "A line in the public transfer ledger",
      "Sponsor role in the Glyph Discord",
    ],
  },
  {
    id: "builder",
    name: "Builder",
    thresholdUsdt: 2_000, // PLACEHOLDER THRESHOLD
    summary: "For teams that depend on Glyph in their Qubic workflow.",
    benefits: [
      "Everything in Supporter",
      "Name and link on this page",
      "Release-note credit when your support ships something",
    ],
  },
  {
    id: "sustainer",
    name: "Sustainer",
    thresholdUsdt: 7_500, // PLACEHOLDER THRESHOLD
    summary: "For organisations funding a reliable independent desktop client.",
    benefits: [
      "Everything in Builder",
      "Logo in the wallet repository and docs footer",
      "Quarterly roadmap conversation with the maintainer",
    ],
  },
  {
    id: "principal",
    name: "Principal",
    thresholdUsdt: 20_000, // PLACEHOLDER THRESHOLD
    summary: "For a named commitment to the open Qubic toolchain.",
    benefits: [
      "Everything in Sustainer",
      "Named credit for a product area or release cycle",
      "Early input on the public roadmap",
    ],
  },
];

export const sponsorConfig = {
  /**
   * Replace with the published Qubic sponsor identity.
   * Keep the REPLACE_ prefix while the page is not ready to collect funds.
   */
  qubicIdentity: "REPLACE_WITH_QUBIC_IDENTITY",
  /**
   * Replace with the published USDT address.
   * Keep the REPLACE_ prefix while the page is not ready to collect funds.
   */
  usdtAddress: "REPLACE_WITH_USDT_ADDRESS",
  /**
   * Replace with the USDT network label shown beside the address.
   * Keep the REPLACE_ prefix while the page is not ready to collect funds.
   */
  usdtNetwork: "REPLACE_WITH_USDT_NETWORK",
  /**
   * Confirmed on-chain transfers only. Keep this empty until a real sponsor
   * transfer has been verified. Do not add speculative or sample entries.
   */
  transfers: [] as SponsorTransfer[],
};

function isPlaceholder(value: string) {
  return value.startsWith("REPLACE_");
}

export const sponsorsConfigured =
  !isPlaceholder(sponsorConfig.qubicIdentity) &&
  !isPlaceholder(sponsorConfig.usdtAddress) &&
  !isPlaceholder(sponsorConfig.usdtNetwork);

export function getSponsorshipTier(id: SponsorshipTierId) {
  return sponsorshipTiers.find((tier) => tier.id === id);
}

const usdtFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function formatSponsorThreshold(value: number) {
  return usdtFormatter.format(value);
}

const sponsorDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

export function formatSponsorDate(value: string) {
  return sponsorDateFormatter.format(new Date(`${value}T00:00:00Z`));
}
