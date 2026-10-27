export type Sponsor = {
  name: string;
  url: string;
  logo: string;
  note: string;
};

export const sponsors: Sponsor[] = [
  {
    name: "MinerLab",
    url: "https://minerlab.io",
    logo: "/sponsors/minerlab.png",
    note: "MinerLab backed Glyph at the very start.",
  },
];
