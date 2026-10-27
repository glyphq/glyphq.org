export type Sponsor = {
  name: string;
  url: string;
  logo: string;
  kind: string;
  note: string;
};

export const sponsorThresholdUsd = 500;

export const sponsors: Sponsor[] = [
  {
    name: "MinerLab",
    url: "https://minerlab.io",
    logo: "/sponsors/minerlab.png",
    kind: "Founding sponsor",
    note: "MinerLab backed Glyph at the very start.",
  },
];
