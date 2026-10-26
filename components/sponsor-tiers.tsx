import { formatSponsorThreshold, sponsorshipTiers } from "@/lib/sponsors";
import { cn } from "@/lib/utils";

const staggerClasses = ["xl:mt-0", "xl:mt-12", "xl:mt-24", "xl:mt-36"];

export function SponsorTiers() {
  return (
    <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
      {sponsorshipTiers.map((tier, index) => (
        <li
          key={tier.id}
          className={cn("flex min-w-0 flex-col", staggerClasses[index])}
        >
          <h3 className="font-display text-3xl font-medium tracking-[-0.045em] text-balance sm:text-4xl">
            {tier.name}
          </h3>
          <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
            From {formatSponsorThreshold(tier.thresholdUsdt)} USDT equivalent
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
            {tier.summary}
          </p>
          <ul className="mt-6 space-y-3">
            {tier.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex max-w-xs gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-brand"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
