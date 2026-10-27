import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import { AccentBox } from "@/components/accent-box";
import { Reveal } from "@/components/reveal";
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

export default function AboutPage() {
  return (
    <>
      <section className="site-container pt-16 pb-16 md:pt-24 md:pb-20">
        <Reveal className="mx-auto max-w-4xl text-center" mount>
          <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
            About <AccentBox>Glyph</AccentBox>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            A Qubic wallet built for the desktop, in the open.
          </p>
        </Reveal>
      </section>

      <div className="bg-background">
        <section className="site-container pb-24 md:pb-32">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
              Why Glyph exists.
            </h2>
            <div className="mx-auto mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
              <p>
                People use Qubic through wallets, apps, and tools. A desktop
                wallet should keep keys on your machine, sign locally, and feel
                like software you chose to install.
              </p>
              <p>
                Glyph started with that wallet. Connect, Relay, and Explorer
                came from the same work: typed requests, a way to return signed
                results, and a clear view of public network data.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="site-container pb-24 md:pb-32">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
              Built by alez04.
            </h2>
            <div className="mt-8">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
                Glyph is designed and built by alez04, a software engineer who
                discovered Qubic in January 2025 and has been working in the
                ecosystem ever since.
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  href="https://github.com/alez04"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  alez04 on GitHub
                  <SiteIcon icon={ArrowRightUpIcon} size={12} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="site-container pb-24 md:pb-32">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
              Built in the open.
            </h2>
            <div className="mt-8">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
                Glyph is an independent, open-source project. The wallet, SDK,
                relay, and explorer are public, and contributions are welcome.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
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
          </Reveal>
        </section>
      </div>
    </>
  );
}
