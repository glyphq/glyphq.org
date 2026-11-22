export interface ProductLink {
  label: string;
  href: string;
  icon: string;
}

export interface Product {
  slug: string;
  name: string;
  summary: string;
  description: string;
  features: string[];
  href: string;
  icon: string;
  primary: ProductLink;
  secondary?: ProductLink;
}

export const attributes = ["Qubic mainnet", "Desktop wallet", "Self-custodial", "Explorer"];

export const products: Product[] = [
  {
    slug: "wallet",
    name: "Glyph Wallet",
    summary:
      "Self-custodial desktop wallet for Qubic, with Vaults, identities, QU transfers, and reviewed app requests.",
    description:
      "Glyph Wallet is a native desktop app built with Tauri v2, React, TypeScript, and Rust. Vaults and wallet data stay on your machine.",
    features: [
      "Vaults and Qubic identities in one place",
      "Send and receive QU with contacts and templates",
      "Review connection, transfer, signing, and contract requests",
      "Windows, macOS, and Linux builds",
    ],
    href: "/products/wallet",
    icon: "solar:wallet-linear",
    primary: {
      label: "Download Glyph",
      href: "/download",
      icon: "glyph",
    },
    secondary: {
      label: "Source",
      href: "https://github.com/glyphq/wallet",
      icon: "solar:code-linear",
    },
  },
  {
    slug: "connect",
    name: "Glyph Connect",
    summary: "TypeScript SDK for typed glyph:// wallet requests and approvals.",
    description:
      "Build typed glyph:// requests, wrap them in an envelope, and open them in Glyph Wallet from a web app or JavaScript tool.",
    features: [
      "Five request builders: transfer, contract input, sign, verify, and connect",
      "Envelope protocol v2 with a canonical request hash",
      "Results through a callback, redirect, or the Glyph relay",
      "Zero runtime dependencies and browser helpers",
    ],
    href: "/products/connect",
    icon: "solar:code-linear",
    primary: {
      label: "Read the docs",
      href: "https://docs.glyphq.org/docs/reference/request-builders",
      icon: "solar:document-text-linear",
    },
    secondary: {
      label: "Source",
      href: "https://github.com/glyphq/connect",
      icon: "solar:code-linear",
    },
  },
  {
    slug: "contracts",
    name: "Glyph Contracts",
    summary: "Typed Qubic contract metadata, ABIs, and binary codecs generated from qubic/core.",
    description:
      "Typed Qubic contract metadata, ABI descriptors, and binary codecs for TypeScript, generated from qubic/core.",
    features: [
      "Metadata for every production contract",
      "Procedures, functions, notifications, structs, and enums",
      "Exact on-chain memory layout and padding",
      "Encoders and decoders for procedure and function inputs and outputs",
    ],
    href: "/products/contracts",
    icon: "solar:document-text-linear",
    primary: {
      label: "View the package",
      href: "https://github.com/glyphq/contracts",
      icon: "solar:box-linear",
    },
    secondary: {
      label: "npm",
      href: "https://www.npmjs.com/package/@glyph-oss/contracts",
      icon: "solar:box-linear",
    },
  },
  {
    slug: "relay",
    name: "Glyph Relay",
    summary: "Carries signed results from the wallet back to a dApp over SSE or polling.",
    description:
      "Relay carries a result from Glyph Wallet back to a dApp. The dApp listens over SSE while the wallet posts the signed response.",
    features: [
      "A Durable Object per session",
      "Read and callback tokens are separate",
      "Results are accepted once and deleted after ten minutes",
      "SSE streaming or polling",
    ],
    href: "/products/relay",
    icon: "solar:server-linear",
    primary: {
      label: "Read the docs",
      href: "https://docs.glyphq.org/docs/guides/relay-v2",
      icon: "solar:document-text-linear",
    },
    secondary: {
      label: "Source",
      href: "https://github.com/glyphq/relay",
      icon: "solar:code-linear",
    },
  },
  {
    slug: "explorer",
    name: "Glyph Explorer",
    summary: "A readable view of Qubic ticks, transactions, identities, tokens, and contracts.",
    description:
      "Glyph Explorer shows public Qubic data without raw RPC responses: network health, ticks, transactions, identities, tokens, and contracts.",
    features: [
      "Network overview and tick health",
      "Identity, transaction, token, and contract lookup",
      "Identity pages with balances and activity",
      "Generated contract metadata and rich-list balances",
    ],
    href: "/products/explorer",
    icon: "solar:global-linear",
    primary: {
      label: "Open Explorer",
      href: "https://explorer.glyphq.org",
      icon: "solar:global-linear",
    },
    secondary: {
      label: "Source",
      href: "https://github.com/glyphq/explorer-v2",
      icon: "solar:code-linear",
    },
  },
  {
    slug: "api",
    name: "Glyph API",
    summary: "Self-hosted Qubic indexer and read API with verification at ingest.",
    description:
      "Glyph API connects to Qubic peers over TCP, verifies what they return, stores normalized history in ClickHouse, and serves a resource-oriented HTTP API.",
    features: [
      "Direct Qubic peers over the native TCP protocol",
      "Quorum and data verification at ingest",
      "Normalized history for reads, streams, and analytics",
      "REST resources, SSE and WebSocket streams, and OpenAPI 3.1",
    ],
    href: "/products/api",
    icon: "solar:database-linear",
    primary: {
      label: "View the source",
      href: "https://github.com/glyphq/service",
      icon: "solar:code-linear",
    },
    secondary: {
      label: "Read the docs",
      href: "https://docs.glyphq.org",
      icon: "solar:document-text-linear",
    },
  },
];

export const principles = [
  {
    icon: "solar:shield-keyhole-linear",
    title: "Self-custodial",
    description: "Your keys stay in the desktop wallet.",
  },
  {
    icon: "solar:wallet-linear",
    title: "Everyday use",
    description: "Vaults, QU transfers, contacts, and activity in one app.",
  },
  {
    icon: "solar:layers-linear",
    title: "One toolchain",
    description: "Wallet, explorer, and the tools apps use to connect.",
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
    links: products.map((product) => ({
      label: product.name.replace("Glyph ", ""),
      href: `/products/${product.slug}`,
    })),
  },
  {
    title: "Explore",
    links: [
      { label: "Showcase", href: "/showcase" },
      { label: "Support", href: "/support" },
      { label: "About", href: "/about" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "https://docs.glyphq.org" },
      { label: "Changelog", href: "/changelog" },
      { label: "GitHub", href: "https://github.com/glyphq" },
      { label: "Discord", href: "https://discord.gg/faKATpcHGf" },
      { label: "Blog", href: "https://glyphq.org/blog" },
    ],
  },
];
