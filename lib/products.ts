import { siteConfig } from "@/lib/site";

export type ProductSlug = "wallet" | "connect" | "relay" | "explorer" | "api";

export type ProductFeature = {
  title: string;
  description: string;
};

export type ProductCta = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
};

export type ProductEndpoint = {
  method: string;
  path: string;
  description: string;
};

export type ProductTech =
  | {
      kind: "code";
      label: string;
      title: string;
      description?: string;
      code: string;
      note?: string;
    }
  | {
      kind: "endpoints";
      label: string;
      title: string;
      description?: string;
      endpoints: ProductEndpoint[];
      note?: string;
    };

export type Product = {
  slug: ProductSlug;
  name: string;
  shortDescription: string;
  intro: string;
  status?: string;
  features: ProductFeature[];
  tech?: ProductTech;
  ctas: ProductCta[];
};

const docs = {
  wallet: "https://docs.glyphq.org/docs/getting-started/install",
  connect: "https://docs.glyphq.org/docs/reference/request-builders",
  relay: "https://docs.glyphq.org/docs/guides/relay-v2",
};

export const products: Product[] = [
  {
    slug: "wallet",
    name: "Wallet",
    shortDescription: "Self-custodial desktop wallet for Qubic.",
    intro:
      "Glyph Wallet is the center of the ecosystem: a native desktop app built with Tauri v2, React, TypeScript, and Rust. Encrypted Vaults and local wallet data stay on your machine, and your seed or Vault password is never uploaded to a Glyph account or recovery service.",
    features: [
      {
        title: "Vaults and identities",
        description:
          "Create or import Vaults, keep Qubic identities together, and organize them with names, colors, icons, and notes.",
      },
      {
        title: "Send and receive QU",
        description:
          "Send to an identity, a saved contact, or multiple recipients. Receive with a QR code or payment link and track each transfer to confirmation.",
      },
      {
        title: "Activity with context",
        description:
          "Searchable history, local memos, tags, saved transfer templates, exports, owned assets, and QEarn information in one place.",
      },
      {
        title: "Connected apps on your terms",
        description:
          "Open glyph:// requests from Qubic apps and review connection, transfer, contract-call, signing, and verification requests before signing.",
      },
      {
        title: "Native on every desktop",
        description:
          "Windows x64, macOS universal, and Linux AppImage, deb, or rpm builds. Keys and signing stay local to the app.",
      },
      {
        title: "Self-custody by design",
        description:
          "Your seed is the recovery method. Glyph cannot recover a seed or reset a forgotten Vault password, so backups matter.",
      },
    ],
    tech: {
      kind: "code",
      label: "Build from source",
      title: "React, TypeScript, Rust, and Tauri v2.",
      description:
        "The wallet is open source and buildable on your own machine. Stable builds are published for Windows, macOS, and Linux.",
      code: `git clone https://github.com/glyphq/wallet.git
cd wallet
bun install --frozen-lockfile
bun tauri dev`,
      note: "Uses Bun 1.3.14 and Rust 1.88.0. Platform prerequisites live in CONTRIBUTING.md.",
    },
    ctas: [
      { label: "Download Glyph", href: "/download" },
      {
        label: "User guide",
        href: docs.wallet,
        external: true,
        variant: "secondary",
      },
      {
        label: "GitHub",
        href: siteConfig.links.wallet,
        external: true,
        variant: "secondary",
      },
    ],
  },
  {
    slug: "connect",
    name: "Connect",
    shortDescription: "Typed SDK for wallet requests and approvals.",
    intro:
      "Connect is a framework-agnostic TypeScript SDK for building glyph:// requests. Construct a typed request, wrap it in a signed envelope, and open it in the Glyph desktop wallet from a web app, dApp, or JavaScript toolchain.",
    features: [
      {
        title: "Five request builders",
        description:
          "Transfer, smart contract input, message signing, message verification, and wallet connection requests share one typed API.",
      },
      {
        title: "Envelope protocol v2",
        description:
          "Requests are wrapped in a glyph-connect-request/2 envelope with a canonical JCS request hash and an 8192-byte payload bound.",
      },
      {
        title: "Safe defaults",
        description:
          "Builders generate a nonce and a five-minute expiry, cap expiry at one hour, and default to Qubic mainnet.",
      },
      {
        title: "Three result paths",
        description:
          "Receive results through a server callback, a browser redirect, or the Glyph relay over SSE.",
      },
      {
        title: "Callback verification",
        description:
          "verifyCallbackEnvelope checks the envelope, request hash, nonce, type, origin, network, and expiry, with an injected SchnorrQ signature check.",
      },
      {
        title: "Small and portable",
        description:
          "Zero runtime dependencies, Node-compatible ESM, and browser helpers for launch, redirect handling, and promise flows.",
      },
    ],
    tech: {
      kind: "code",
      label: "Quick start",
      title: "Build a request, wrap it, launch it.",
      description:
        "The SDK ships request builders, envelope helpers, and a deep-link encoder. Mainnet is the default network binding.",
      code: `import {
  buildGlyphUrl,
  createEnvelope,
  createTransferRequest,
} from "@glyph-oss/connect";

const request = createTransferRequest({
  type: "transfer",
  dapp: { name: "My App", origin: "https://my.app" },
  to: "QUBIC_IDENTITY",
  amount: "1000",
});

const envelope = createEnvelope(request, {
  callback: "https://my.app/api/glyph/callback",
});

const url = buildGlyphUrl(envelope);`,
      note: "Install with bun add @glyph-oss/connect or npm install @glyph-oss/connect.",
    },
    ctas: [
      {
        label: "Read the docs",
        href: docs.connect,
        external: true,
      },
      {
        label: "GitHub",
        href: siteConfig.links.connect,
        external: true,
        variant: "secondary",
      },
    ],
  },
  {
    slug: "relay",
    name: "Relay",
    shortDescription: "Transport for dApp callbacks over SSE.",
    intro:
      "Relay is a bounded result bridge for Glyph Wallet dApps, deployed on Cloudflare Workers with Durable Objects. The dApp streams a result over SSE while the wallet posts the signed response to a separate callback URL.",
    features: [
      {
        title: "A Durable Object per session",
        description:
          "Each session routes the wallet callback and the dApp stream to the same isolate, sharing state without a central store.",
      },
      {
        title: "Split capabilities",
        description:
          "Read and callback tokens are separate. The relay stores only their SHA-256 hashes, and the wallet never receives the read token.",
      },
      {
        title: "Short-lived results",
        description:
          "Results are persisted through eviction, accepted once, and deleted after ten minutes.",
      },
      {
        title: "SSE or polling",
        description:
          "Stream a result with GET /v2/stream or poll GET /v2/result. SSE connections time out after five minutes.",
      },
      {
        title: "Bounded fan-out",
        description:
          "A session allows at most five listeners, and edge rate limiting applies per client and action before a request reaches a Durable Object.",
      },
      {
        title: "Init before use",
        description:
          "Sessions must be registered with both capabilities before callbacks or reads are accepted. Re-registration returns 409.",
      },
    ],
    tech: {
      kind: "endpoints",
      label: "Protocol v2",
      title: "Four endpoints and a health check.",
      description:
        "The dApp registers a session, launches the wallet with the callback URL, then reads the result by stream or poll.",
      endpoints: [
        {
          method: "POST",
          path: "/v2/register/:session",
          description: "Initialize a session with readCap and callbackCap.",
        },
        {
          method: "POST",
          path: "/v2/callback/:session/:callbackCap",
          description: "Wallet posts the signed result.",
        },
        {
          method: "GET",
          path: "/v2/stream/:session/:readCap",
          description: "SSE stream that holds until the result arrives.",
        },
        {
          method: "GET",
          path: "/v2/result/:session/:readCap",
          description: "Poll for the result, or 404 while pending.",
        },
        {
          method: "GET",
          path: "/v1/health, /v2/health",
          description: "Health check for the deployed relay.",
        },
      ],
      note: "registerRelaySession, subscribeViaRelay, and relayCallbackUrl are available in @glyph-oss/connect.",
    },
    ctas: [
      {
        label: "Read the docs",
        href: docs.relay,
        external: true,
      },
      {
        label: "GitHub",
        href: siteConfig.links.relay,
        external: true,
        variant: "secondary",
      },
    ],
  },
  {
    slug: "explorer",
    name: "Explorer",
    shortDescription: "Network data for Qubic identities and activity.",
    intro:
      "Glyph Explorer is a fast, readable view of public Qubic data. It uses the official Qubic RPC packages to show network health, ticks, transactions, identities, tokens, generated contract metadata, and the rich list.",
    features: [
      {
        title: "Network overview",
        description:
          "Current tick quality and network health at a glance, with explicit unavailable states when an upstream service has no answer.",
      },
      {
        title: "Direct lookup",
        description:
          "Search identities, transaction hashes, ticks, tokens, and contracts without digging through raw RPC responses.",
      },
      {
        title: "Identity pages",
        description:
          "Balances, asset relationships, transaction history, QR sharing, and optional wallet-transfer preparation.",
      },
      {
        title: "Contract and tick detail",
        description:
          "Transaction payloads, safe generated-contract procedure decoding, tick metadata, and transaction lists.",
      },
      {
        title: "Catalogues",
        description:
          "Browse issued assets, generated smart contracts, and rich-list balances from the public Stats API.",
      },
      {
        title: "Honest about freshness",
        description:
          "The explorer presents public RPC responses only. Archive and stats data can lag the live network.",
      },
    ],
    tech: {
      kind: "code",
      label: "Self-host",
      title: "Point it at your own RPC endpoints.",
      description:
        "The explorer runs on Next.js 16 and works with the default public Qubic endpoints without local configuration. Override them for a trusted mirror or self-hosted infrastructure.",
      code: `NEXT_PUBLIC_SITE_URL=https://explorer.glyphq.org
NEXT_PUBLIC_QUBIC_LIVE_RPC_URL=https://rpc.qubic.org/live/v1
NEXT_PUBLIC_QUBIC_QUERY_RPC_URL=https://rpc.qubic.org/query/v1`,
      note: "The optional Glyph transfer client validates signed wallet callbacks against a trusted public key before accepting them.",
    },
    ctas: [
      {
        label: "Open Explorer",
        href: siteConfig.links.explorer,
        external: true,
      },
      {
        label: "GitHub",
        href: siteConfig.links.explorerRepo,
        external: true,
        variant: "secondary",
      },
    ],
  },
  {
    slug: "api",
    name: "API",
    shortDescription: "Programmatic access for Qubic data. In progress.",
    intro:
      "The Glyph API is in progress. The goal is a documented, programmatic way for apps and services to read Qubic data without stitching together individual RPC endpoints. Follow along in Discord or the proposals repository as the design takes shape.",
    status: "In progress",
    features: [
      {
        title: "One access layer",
        description:
          "A single documented surface for Qubic data instead of a collection of endpoints assembled per app.",
      },
      {
        title: "Consistent with the ecosystem",
        description:
          "Designed alongside the wallet, Connect, Relay, and Explorer so the same data reads the same way across Glyph tools.",
      },
      {
        title: "Built in the open",
        description:
          "Scope, endpoint design, and release timing will be discussed publicly before the API ships.",
      },
      {
        title: "Developer first",
        description:
          "The target is predictable responses, clear errors, and documentation that does not require reading the network source.",
      },
    ],
    ctas: [
      {
        label: "Follow updates",
        href: siteConfig.links.discord,
        external: true,
      },
      {
        label: "Proposals",
        href: "https://github.com/glyphq/proposals",
        external: true,
        variant: "secondary",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getOtherProducts(slug: ProductSlug): Product[] {
  return products.filter((product) => product.slug !== slug);
}
