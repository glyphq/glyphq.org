import {
  ArrowRightIcon,
  EyeIcon,
  Folder2Icon,
  LaptopIcon,
  ShieldIcon,
} from "@solar-icons/react/linear";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { siteConfig } from "@/lib/site";

const features = [
  {
    icon: ShieldIcon,
    title: "Keys stay on your desktop",
    body: "Vaults are encrypted on disk and unlocked into native memory. You hold the backup and the password.",
  },
  {
    icon: EyeIcon,
    title: "Know what you sign",
    body: "Transfers, contract calls, and app requests show the account, amount, and action before you approve.",
  },
  {
    icon: Folder2Icon,
    title: "Your setup stays together",
    body: "Keep several Vaults, contacts, saved transfer templates, and searchable history in one app.",
  },
  {
    icon: LaptopIcon,
    title: "Native on every desktop",
    body: "Built with Rust and React for Windows, macOS, and Linux.",
  },
] as const;

export function HomeFeatures() {
  return (
    <section
      aria-labelledby="features-heading"
      className="site-container pt-6 pb-24 md:pt-10 md:pb-32"
    >
      <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div>
          <h2
            id="features-heading"
            className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
          >
            Self-custody,
            <br />
            <span className="text-muted-foreground">made practical.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            Glyph keeps the keys and signing on your desktop, then shows you
            exactly what each request will do.
          </p>
          <SiteButtonLink
            href={siteConfig.links.docs}
            external
            variant="secondary"
            size="md"
            className="mt-8"
          >
            Read the user guide
            <SiteIcon icon={ArrowRightIcon} size={16} />
          </SiteButtonLink>
        </div>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="max-w-sm">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <SiteIcon icon={feature.icon} size={20} />
              </span>
              <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.02em]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
