export type Sponsor = {
  name: string;
  url: string;
  logo: string;
  description: string;
  donatedUsd: number;
  donationLabel: string;
  invert?: boolean;
  crown?: boolean;
  gold?: boolean;
};

export const sponsorThresholds = {
  person: 100,
  organization: 250,
} as const;

export const sponsors: Sponsor[] = [
  {
    name: "MinerLab",
    url: "https://minerlab.io",
    logo: "/sponsors/minerlab.png",
    description:
      "MinerLab runs mining pools for Qubic, Xelis, Abel, and Ore, with transparent payouts and live network stats.",
    donatedUsd: 2000,
    donationLabel: "$2,000+",
    gold: true,
    crown: true,
  },
];
