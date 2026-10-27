export type Sponsor = {
  name: string;
  url: string;
  logo: string;
  description: string;
  invert?: boolean;
  crown?: boolean;
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
      "Decentralized mining pool infrastructure and analytics for Qubic miners.",
    invert: true,
    crown: true,
  },
];
