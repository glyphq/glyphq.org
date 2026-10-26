import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import { AccentBox } from "@/components/accent-box";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Glyph is an independent, open-source Qubic wallet and developer ecosystem.",
  path: "/about",
  image: "/about/opengraph-image",
});

const contributions = [
  {
    label: "TypeScript client",
    href: "https://github.com/qubic/qubic-typescript",
  },
  {
    label: "Wallet extension",
    href: "https://github.com/qubic/wallet-extension",
  },
  {
    label: "Network explorer",
    href: "https://explorer.qubic.org",
  },
  {
    label: "alez04 on GitHub",
    href: "https://github.com/alez04",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="site-container pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-4xl">
          <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
            About <AccentBox>Glyph</AccentBox>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            A Qubic wallet built for the desktop, in the open.
          </p>
        </div>
      </section>

      <div className="bg-background">
        <section className="site-container pb-24 md:pb-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <h2 className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
              Why Glyph exists.
            </h2>
            <div className="max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
              <p>
                Qubic deserves a wallet that feels like a desktop app: keys on
                your machine, a real window, and native signing.
              </p>
              <p>
                Glyph started with that wallet. It has grown into a small
                ecosystem: Connect for typed requests, Relay for app callbacks,
                and Explorer for public network data.
              </p>
            </div>
          </div>
        </section>

        <section className="site-container pb-24 md:pb-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <h2 className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
              Built by alez04.
            </h2>
            <div>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
                Glyph is designed and built by alez04, who has worked on Qubic
                tooling including the TypeScript client, the browser wallet
                extension, and the official network explorer.
              </p>
              <div className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {contributions.map((contribution) => (
                  <a
                    key={contribution.href}
                    href={contribution.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {contribution.label}
                    <SiteIcon icon={ArrowRightUpIcon} size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="site-container pb-24 md:pb-32">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <h2 className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
              Built in the open.
            </h2>
            <div>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
                Glyph is an independent, open-source project. The wallet, SDK,
                relay, and explorer are public, and contributions are welcome.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <SiteButtonLink
                  href={siteConfig.links.github}
                  external
                  size="md"
                >
                  View the source
                  <SiteIcon icon={ArrowRightUpIcon} size={16} />
                </SiteButtonLink>
                <SiteButtonLink
                  href={siteConfig.links.discord}
                  external
                  variant="secondary"
                  size="md"
                >
                  Join Discord
                </SiteButtonLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
