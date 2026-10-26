import { ArrowRightUpIcon, DownloadIcon } from "@solar-icons/react/linear";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The Glyph ecosystem: a self-custodial Qubic wallet, Connect SDK, Relay, Explorer, and API.",
};

const docs = {
  wallet: "https://docs.glyphq.org/docs/getting-started/install",
  connect: "https://docs.glyphq.org/docs/reference/request-builders",
  relay: "https://docs.glyphq.org/docs/guides/relay-v2",
};

const productAnchors = [
  { label: "Wallet", href: "#wallet" },
  { label: "Connect", href: "#connect" },
  { label: "Relay", href: "#relay" },
  { label: "Explorer", href: "#explorer" },
  { label: "API", href: "#api" },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl bg-foreground/5 p-5 font-mono text-xs leading-relaxed text-foreground/85">
      {children}
    </pre>
  );
}

function Feature({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg font-medium tracking-[-0.02em]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
        {children}
      </p>
    </div>
  );
}

function ProductHeader({
  id,
  name,
  description,
  children,
}: {
  id: string;
  name: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2
        id={`${id}-heading`}
        className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] sm:text-5xl"
      >
        {name}
      </h2>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <section className="site-container pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-4xl">
          <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
            Tools for{" "}
            <span className="inline-flex items-center rounded-[0.16em] bg-brand px-[0.12em] py-[0.04em] text-brand-foreground">
              Qubic
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            A self-custodial wallet and the developer tools around it.
          </p>
          <nav
            aria-label="Product sections"
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            {productAnchors.map((product) => (
              <a
                key={product.href}
                href={product.href}
                className="transition-colors hover:text-foreground"
              >
                {product.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="bg-background">
        <section
          id="wallet"
          aria-labelledby="wallet-heading"
          className="site-container scroll-mt-28 pb-24 md:pb-32"
        >
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <ProductHeader
              id="wallet"
              name="Wallet"
              description="A self-custodial desktop wallet for Qubic. Keep your Vaults, identities, contacts, and history on your machine."
            >
              <SiteButtonLink href="/download" size="md">
                <SiteIcon icon={DownloadIcon} size={16} />
                Download Glyph
              </SiteButtonLink>
              <SiteButtonLink
                href={docs.wallet}
                external
                variant="secondary"
                size="md"
              >
                User guide
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
            </ProductHeader>

            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <Feature title="Vaults and identities">
                Keep Qubic accounts, contacts, and local notes organized.
              </Feature>
              <Feature title="Send and receive QU">
                Single and batch transfers, payment links, and QR codes.
              </Feature>
              <Feature title="Review before signing">
                Transfers, contract calls, and app requests show the details
                first.
              </Feature>
              <Feature title="Native desktop">
                Windows, macOS, and Linux with local signing.
              </Feature>
            </div>
          </div>
        </section>

        <section
          id="connect"
          aria-labelledby="connect-heading"
          className="site-container scroll-mt-28 pb-24 md:pb-32"
        >
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <ProductHeader
              id="connect"
              name="Connect"
              description="A typed TypeScript SDK for Glyph deep-link requests. Build a request, wrap it in an envelope, and open it in the wallet."
            >
              <SiteButtonLink href={docs.connect} external size="md">
                Read the docs
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
              <SiteButtonLink
                href={siteConfig.links.connect}
                external
                variant="secondary"
                size="md"
              >
                GitHub
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
            </ProductHeader>

            <div className="space-y-8">
              <CodeBlock>{`import {
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

const url = buildGlyphUrl(envelope);`}</CodeBlock>
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <Feature title="Five request types">
                  Transfer, contract call, message signing, verification, and
                  connection.
                </Feature>
                <Feature title="Framework-agnostic">
                  Browser helpers and Node 18+ support.
                </Feature>
                <Feature title="Typed end to end">
                  Request builders and callback parsing.
                </Feature>
                <Feature title="Three result paths">
                  Server callbacks, browser redirects, or Relay.
                </Feature>
              </div>
            </div>
          </div>
        </section>

        <section
          id="relay"
          aria-labelledby="relay-heading"
          className="site-container scroll-mt-28 pb-24 md:pb-32"
        >
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <ProductHeader
              id="relay"
              name="Relay"
              description="A secure bridge for wallet callbacks, running on Cloudflare Workers with Durable Objects. dApps stream results over SSE while the wallet posts the signed response."
            >
              <SiteButtonLink href={docs.relay} external size="md">
                Read the docs
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
              <SiteButtonLink
                href={siteConfig.links.relay}
                external
                variant="secondary"
                size="md"
              >
                GitHub
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
            </ProductHeader>

            <div className="space-y-8">
              <CodeBlock>{`POST /v2/register/:session
POST /v2/callback/:session/:callbackCap
GET  /v2/stream/:session/:readCap
GET  /v2/result/:session/:readCap`}</CodeBlock>
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <Feature title="Session isolation">
                  Each session gets its own Durable Object.
                </Feature>
                <Feature title="Split capabilities">
                  Read and callback tokens are separate.
                </Feature>
                <Feature title="Short-lived results">
                  Accepted once and deleted after ten minutes.
                </Feature>
                <Feature title="SSE or polling">
                  Stream results or poll for them.
                </Feature>
              </div>
            </div>
          </div>
        </section>

        <section
          id="explorer"
          aria-labelledby="explorer-heading"
          className="site-container scroll-mt-28 pb-24 md:pb-32"
        >
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <ProductHeader
              id="explorer"
              name="Explorer"
              description="A fast, readable view of public Qubic data. Look up identities, transactions, ticks, tokens, contracts, and the rich list."
            >
              <SiteButtonLink
                href={siteConfig.links.explorer}
                external
                size="md"
              >
                Open Explorer
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
              <SiteButtonLink
                href={siteConfig.links.explorerRepo}
                external
                variant="secondary"
                size="md"
              >
                GitHub
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
            </ProductHeader>

            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <Feature title="Network overview">
                Current tick quality and network health.
              </Feature>
              <Feature title="Direct lookup">
                Identities, transactions, ticks, tokens, and contracts.
              </Feature>
              <Feature title="Wallet handoff">
                Prepare a transfer from an identity page.
              </Feature>
              <Feature title="Public data only">
                Archive and stats can lag the live network.
              </Feature>
            </div>
          </div>
        </section>

        <section
          id="api"
          aria-labelledby="api-heading"
          className="site-container scroll-mt-28 pb-24 md:pb-32"
        >
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <h2
                id="api-heading"
                className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] sm:text-5xl"
              >
                API
              </h2>
              <span className="rounded-full bg-foreground/8 px-2.5 py-1 text-xs text-muted-foreground">
                In progress
              </span>
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
              Programmatic access for Qubic data. In progress.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SiteButtonLink
                href={siteConfig.links.discord}
                external
                size="md"
              >
                Follow updates
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
              <SiteButtonLink
                href="https://github.com/glyphq/proposals"
                external
                variant="secondary"
                size="md"
              >
                Proposals
                <SiteIcon icon={ArrowRightUpIcon} size={16} />
              </SiteButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
