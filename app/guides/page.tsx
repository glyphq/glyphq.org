import { ArrowRightIcon, ArrowRightUpIcon } from "@solar-icons/react/linear";
import Link from "next/link";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Guides",
  description:
    "Practical guides for installing Glyph Wallet, sending QU, and connecting Qubic dApps with the Connect SDK.",
  path: "/guides",
});

const guides = [
  {
    slug: "install-and-setup",
    title: "Install and set up Glyph",
    description:
      "Download the wallet for your desktop, create a Vault, and back up your seed before you add funds.",
    topic: "Wallet",
  },
  {
    slug: "send-qubic",
    title: "Send QU",
    description:
      "Move QU to an identity or contact, receive with a QR code, and track a transfer from broadcast to confirmation.",
    topic: "Wallet",
  },
  {
    slug: "connect-a-dapp",
    title: "Connect a dApp",
    description:
      "Build a Glyph deep-link request with @glyph-oss/connect, deliver the result safely, and verify what comes back.",
    topic: "Developers",
  },
] as const;

export default function GuidesPage() {
  return (
    <>
      <header className="pb-14 md:pb-16">
        <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
          Practical Qubic,
          <br />
          <span className="text-foreground/80">step by step.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          Set up the wallet, send QU, and connect apps. Short guides built
          around how Glyph actually works.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <SiteButtonLink href="/download" size="md">
            Download Glyph
          </SiteButtonLink>
          <SiteButtonLink
            href={siteConfig.links.docs}
            external
            variant="secondary"
            size="md"
          >
            Full documentation
            <SiteIcon icon={ArrowRightUpIcon} size={16} />
          </SiteButtonLink>
        </div>
      </header>

      <section aria-labelledby="all-guides-heading">
        <h2
          id="all-guides-heading"
          className="font-display text-xl font-medium tracking-[-0.02em]"
        >
          All guides
        </h2>

        <ul className="mt-8 space-y-10">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="min-w-0 font-display text-2xl leading-tight font-medium tracking-[-0.03em] transition-colors group-hover:text-brand sm:text-3xl">
                    {guide.title}
                  </span>
                  <SiteIcon
                    icon={ArrowRightIcon}
                    size={16}
                    className="mt-1.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className="mt-2 block max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
                  {guide.description}
                </span>
                <span className="mt-3 block font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase">
                  {guide.topic}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
