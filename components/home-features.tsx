import { ArrowRightIcon } from "@solar-icons/react/linear";
import { MaskIcon } from "@/components/mask-icon";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Feature = {
  title: string;
  body: string;
  mask: string;
  card: string;
  icon: string;
  platforms?: string[];
};

const features: Feature[] = [
  {
    title: "Keys stay on your desktop",
    body: "Vaults are encrypted on disk and unlocked into native memory. You hold the backup and the password.",
    mask: "/masks/key.svg",
    card: "lg:col-span-7",
    icon: "-right-16 -bottom-20 size-[18rem] rotate-[-10deg] lg:size-[24rem]",
  },
  {
    title: "Know what you sign",
    body: "Transfers, contract calls, and app requests show the account, amount, and action before you approve.",
    mask: "/masks/shield-check.svg",
    card: "lg:col-span-5",
    icon: "-right-10 -top-14 size-[15rem] rotate-[8deg] lg:size-[19rem]",
  },
  {
    title: "Your setup stays together",
    body: "Keep several Vaults, contacts, saved transfer templates, and searchable history in one app.",
    mask: "/masks/layers.svg",
    card: "lg:col-span-5",
    icon: "-right-12 -bottom-16 size-[15rem] rotate-[-6deg] lg:size-[20rem]",
  },
  {
    title: "Native on every desktop",
    body: "Built with Rust and React for Windows, macOS, and Linux.",
    mask: "/masks/laptop.svg",
    card: "lg:col-span-7",
    icon: "",
    platforms: ["/os/windows.svg", "/os/apple.svg", "/os/linux.svg"],
  },
];

export function HomeFeatures() {
  return (
    <section
      aria-labelledby="features-heading"
      className="site-container pt-6 pb-24 md:pt-10 md:pb-32"
    >
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <h2
          id="features-heading"
          className="font-display text-4xl leading-[0.96] font-semibold tracking-[-0.06em] text-balance sm:text-5xl lg:text-6xl"
        >
          Self-custody,
          <br />
          <span className="text-muted-foreground">made practical.</span>
        </h2>

        <div className="max-w-md lg:pb-1">
          <p className="text-base leading-relaxed text-muted-foreground text-pretty">
            Glyph keeps the keys and signing on your desktop, then shows you
            exactly what each request will do.
          </p>
          <SiteButtonLink
            href={siteConfig.links.docs}
            external
            variant="secondary"
            size="md"
            className="mt-6"
          >
            Read the user guide
            <SiteIcon icon={ArrowRightIcon} size={16} />
          </SiteButtonLink>
        </div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-12">
        {features.map((feature) => (
          <article
            key={feature.title}
            className={cn(
              "group relative isolate flex min-h-[18rem] flex-col overflow-hidden rounded-[2rem] bg-foreground/[0.035] p-7 transition-colors hover:bg-foreground/[0.06] md:min-h-[21rem] md:p-9",
              feature.card,
            )}
          >
            {feature.platforms ? (
              <div className="pointer-events-none absolute right-5 bottom-8 flex items-end gap-2 md:right-8 md:bottom-10 md:gap-4">
                {feature.platforms.map((src, index) => (
                  <MaskIcon
                    key={src}
                    src={src}
                    className={cn(
                      "relative size-14 md:size-20",
                      index === 1 ? "mb-6 md:mb-10" : "mb-0",
                    )}
                  />
                ))}
              </div>
            ) : (
              <MaskIcon src={feature.mask} className={feature.icon} />
            )}
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="max-w-[14rem] font-display text-2xl leading-[1.05] font-medium tracking-[-0.03em] text-balance sm:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-auto max-w-xs pt-16 text-sm leading-relaxed text-muted-foreground text-pretty">
                {feature.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
