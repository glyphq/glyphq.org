export type SponsorAsset = "QU" | "USDT";

export type SponsorshipThresholdId = "ledger" | "link" | "logo" | "roadmap";

export type SponsorshipThreshold = {
  id: SponsorshipThresholdId;
  thresholdUsdt: number;
  /** One short line describing the recognition at this threshold. */
  recognition: string;
};

export type SponsorTransfer = {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  sponsor: string;
  asset: SponsorAsset;
  /** Exact display amount. Do not round on-chain values. */
  amount: string;
  thresholdId: SponsorshipThresholdId;
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
export const sponsorshipThresholds: SponsorshipThreshold[] = [
  {
    id: "ledger",
    thresholdUsdt: 25, // PLACEHOLDER THRESHOLD
    recognition: "Name in the public ledger.",
  },
  {
    id: "link",
    thresholdUsdt: 100, // PLACEHOLDER THRESHOLD
    recognition: "Name and link.",
  },
  {
    id: "logo",
    thresholdUsdt: 500, // PLACEHOLDER THRESHOLD
    recognition: "Logo and release credit.",
  },
  {
    id: "roadmap",
    thresholdUsdt: 1_000, // PLACEHOLDER THRESHOLD
    recognition: "Roadmap conversation.",
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

export function getSponsorshipThreshold(id: SponsorshipThresholdId) {
  return sponsorshipThresholds.find((threshold) => threshold.id === id);
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
