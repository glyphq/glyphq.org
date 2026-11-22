export interface Product {
  name: string;
  summary: string;
  href: string;
  icon: string;
}

export const nav = [
  { label: "Products", href: "#products" },
  { label: "Principles", href: "#principles" },
  { label: "Developers", href: "#developers" },
  { label: "Docs", href: "https://docs.glyphq.org" },
];

export const attributes = ["Qubic mainnet", "Open source", "Self-custodial", "Typed SDKs"];

export const products: Product[] = [
  {
    name: "Glyph Wallet",
    summary:
      "Self-custodial desktop wallet for Qubic, with Vaults, identities, QU transfers, and reviewed app requests.",
    href: "https://glyphq.org/download",
    icon: "solar:wallet-linear",
  },
  {
    name: "Glyph Connect",
    summary: "TypeScript SDK for typed glyph:// wallet requests and approvals.",
    href: "https://docs.glyphq.org/docs/reference/request-builders",
    icon: "solar:code-linear",
  },
  {
    name: "Glyph Contracts",
    summary: "Typed Qubic contract metadata, ABIs, and binary codecs generated from qubic/core.",
    href: "https://github.com/glyphq/contracts",
    icon: "solar:document-text-linear",
  },
  {
    name: "Glyph Relay",
    summary: "Carries signed results from the wallet back to a dApp over SSE or polling.",
    href: "https://docs.glyphq.org/docs/guides/relay-v2",
    icon: "solar:server-linear",
  },
  {
    name: "Glyph Explorer",
    summary: "A readable view of Qubic ticks, transactions, identities, tokens, and contracts.",
    href: "https://explorer.glyphq.org",
    icon: "solar:global-linear",
  },
  {
    name: "Glyph API",
    summary: "Self-hosted Qubic indexer and read API with verification at ingest.",
    href: "https://github.com/glyphq/service",
    icon: "solar:database-linear",
  },
];

export const principles = [
  {
    icon: "solar:shield-keyhole-linear",
    title: "Self-custodial",
    description: "Keys and signing stay in the desktop wallet.",
  },
  {
    icon: "solar:code-linear",
    title: "Open source",
    description: "The wallet, SDKs, relay, explorer, and API are public repositories.",
  },
  {
    icon: "solar:layers-linear",
    title: "Typed",
    description: "Connect and Contracts ship TypeScript types and binary codecs.",
  },
];

export const specs = [
  { label: "Wallet", value: "Windows, macOS, Linux" },
  { label: "Connect", value: "@glyph-oss/connect" },
  { label: "Contracts", value: "@glyph-oss/contracts" },
  { label: "Relay", value: "SSE + polling" },
  { label: "Explorer", value: "explorer.glyphq.org" },
  { label: "API", value: "self-hosted" },
];

export const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "Wallet", href: "https://glyphq.org/download" },
      { label: "Connect", href: "https://docs.glyphq.org/docs/reference/request-builders" },
      { label: "Contracts", href: "https://github.com/glyphq/contracts" },
      { label: "Relay", href: "https://docs.glyphq.org/docs/guides/relay-v2" },
      { label: "Explorer", href: "https://explorer.glyphq.org" },
      { label: "API", href: "https://github.com/glyphq/service" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "https://docs.glyphq.org" },
      { label: "GitHub", href: "https://github.com/glyphq" },
      { label: "Discord", href: "https://discord.gg/faKATpcHGf" },
      { label: "Blog", href: "https://glyphq.org/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "https://glyphq.org/about" },
      { label: "Products", href: "https://glyphq.org/products" },
      { label: "Donate", href: "https://glyphq.org/donate" },
    ],
  },
];
