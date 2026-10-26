export type Sponsor = {
  name: string;
  identity: string;
  amount: string;
  date: string;
  transaction?: string;
};

export const sponsorConfig = {
  // Replace with the published Qubic sponsor identity before launching this page.
  identity: "REPLACE_WITH_SPONSOR_IDENTITY",
  sponsors: [] as Sponsor[],
};

export const sponsorsConfigured =
  !sponsorConfig.identity.startsWith("REPLACE_");
