import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import { DiscordMark } from "@/components/discord-mark";
import { Reveal } from "@/components/reveal";
import { SiteIcon } from "@/components/site-icon";
import { siteConfig } from "@/lib/site";

export function HomeDiscord() {
  return (
    <section
      aria-labelledby="discord-heading"
      className="site-container pb-24 md:pb-32"
    >
      <Reveal>
        <a
          href={siteConfig.links.discord}
          target="_blank"
          rel="noreferrer"
          className="group grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 text-[#5865f2]">
              <DiscordMark className="size-5" />
              <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase">
                Discord
              </span>
            </div>
            <h2
              id="discord-heading"
              className="mt-7 font-display text-4xl leading-[0.96] font-semibold tracking-[-0.06em] text-balance text-foreground sm:text-5xl lg:text-6xl"
            >
              Built in the open.
              <br />
              <span className="text-[#5865f2]">Answered in Discord.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              Wallet help, release notes, and build talk from the people making
              Glyph.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#5865f2] px-5 py-3 text-sm font-medium text-white transition-colors group-hover:bg-[#4752c4]">
              Join the Glyph Discord
              <SiteIcon icon={ArrowRightUpIcon} size={16} />
            </span>
            <span className="mt-4 block font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground">
              discord.gg/s5qNRNGu96
            </span>
          </div>

          <div className="hidden justify-end lg:flex">
            <DiscordMark className="size-56 text-[#5865f2]/20 transition-colors duration-300 group-hover:text-[#5865f2]/30" />
          </div>
        </a>
      </Reveal>
    </section>
  );
}
