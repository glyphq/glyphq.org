import { ArrowRightIcon } from "@solar-icons/react/linear";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteIcon } from "@/components/site-icon";
import { type Guide, guides } from "@/lib/guides";
import { pageMetadata } from "@/lib/page-metadata";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Guides",
  description:
    "Practical guides for installing Glyph Wallet, sending QU, and connecting Qubic dApps with the Connect SDK.",
  path: "/guides",
});

const [leadGuide, ...moreGuides] = guides;

function GuideLink({
  guide,
  featured = false,
}: {
  guide: Guide;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={cn(
        "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        featured
          ? "max-w-2xl"
          : "h-full rounded-2xl bg-foreground/[0.035] p-6 transition-colors duration-300 ease-out hover:bg-foreground/[0.06]",
      )}
    >
      <span className="font-mono text-[0.7rem] tracking-[0.16em] text-brand uppercase">
        {guide.category}
      </span>
      {featured ? (
        <>
          <span className="mt-4 block font-display text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.05em] text-balance transition-colors group-hover:text-brand">
            {guide.title}
          </span>
          <span className="mt-5 block max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {guide.description}
          </span>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
            Read the guide
            <SiteIcon
              icon={ArrowRightIcon}
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </>
      ) : (
        <>
          <span className="mt-3 flex items-start justify-between gap-4">
            <span className="min-w-0 font-display text-2xl leading-tight font-medium tracking-[-0.03em] text-balance transition-colors group-hover:text-brand">
              {guide.title}
            </span>
            <SiteIcon
              icon={ArrowRightIcon}
              size={16}
              className="mt-1.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
            />
          </span>
          <span className="mt-2 block max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
            {guide.description}
          </span>
        </>
      )}
    </Link>
  );
}

export default function GuidesPage() {
  return (
    <>
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance sm:text-4xl">
          Practical Qubic, step by step.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          Short walkthroughs for setting up Glyph, moving QU, and connecting
          Qubic dApps.
        </p>
      </header>

      <section aria-labelledby="lead-guide-heading" className="mt-16 md:mt-20">
        <h2 id="lead-guide-heading" className="sr-only">
          Featured guide
        </h2>
        {leadGuide ? (
          <Reveal className="max-w-2xl">
            <GuideLink guide={leadGuide} featured />
          </Reveal>
        ) : null}
      </section>

      {moreGuides.length > 0 ? (
        <section
          aria-labelledby="more-guides-heading"
          className="mt-20 md:mt-24"
        >
          <h2 id="more-guides-heading" className="text-sm font-medium">
            More guides
          </h2>
          <div className="mt-8 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {moreGuides.map((guide, index) => (
              <Reveal key={guide.slug} className="min-w-0" delay={index * 0.06}>
                <GuideLink guide={guide} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
