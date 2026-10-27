import { ArrowRightIcon } from "@solar-icons/react/linear";
import Link from "next/link";
import { MaskIcon } from "@/components/ui/mask-icon";
import { Reveal } from "@/components/ui/reveal";
import { SiteIcon } from "@/components/ui/site-icon";
import { siteConfig } from "@/lib/site";

const features = [
  {
    title: "Keys stay on your desktop",
    body: "Vaults are encrypted on disk and unlocked in native memory. You hold the backup and the password.",
    mask: "/masks/key.svg",
  },
  {
    title: "Know what you sign",
    body: "Every transfer, contract call, and app request is shown before you approve.",
  },
  {
    title: "Your setup stays together",
    body: "Vaults, contacts, saved templates, and searchable history in one app.",
  },
  {
    title: "Native on every desktop",
    body: "Built with Rust and React for a fast, local-first app.",
    platforms: "Windows / macOS / Linux",
  },
];

export function HomeFeatures() {
  return (
    <section
      aria-labelledby="features-heading"
      className="site-container pt-6 pb-24 md:pt-10 md:pb-32"
    >
      <Reveal className="max-w-3xl">
        <h2
          id="features-heading"
          className="font-display text-4xl leading-[0.96] font-semibold tracking-[-0.06em] text-balance sm:text-5xl lg:text-6xl"
        >
          Self-custody,
          <br />
          <span className="text-muted-foreground">made practical.</span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          Glyph keeps the keys and signing on your desktop, then shows you
          exactly what each request will do.
        </p>

        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-brand"
        >
          Read the user guide
          <SiteIcon icon={ArrowRightIcon} size={14} />
        </Link>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Reveal key={feature.title} className="min-w-0" delay={index * 0.06}>
            <article className="group relative isolate flex h-full min-h-[14rem] flex-col overflow-hidden rounded-[2rem] bg-foreground/[0.035] p-7 transition-colors duration-300 ease-out hover:bg-foreground/[0.06] md:min-h-[16rem] md:p-8">
              {feature.mask ? (
                <MaskIcon
                  src={feature.mask}
                  className="-top-12 -right-12 size-48 rotate-[-12deg] opacity-15 md:size-56"
                />
              ) : null}

              <div className="relative z-10 flex h-full flex-col">
                <h3 className="max-w-[15rem] font-display text-xl leading-tight font-medium tracking-[-0.02em] text-balance md:text-2xl">
                  {feature.title}
                </h3>
                <div className="mt-auto pt-10">
                  <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
                    {feature.body}
                  </p>
                  {feature.platforms ? (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {feature.platforms}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
