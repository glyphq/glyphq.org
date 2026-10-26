import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import { DiscordMark } from "@/components/discord-mark";
import { Reveal } from "@/components/reveal";
import { SiteIcon } from "@/components/site-icon";
import { siteConfig } from "@/lib/site";

export function HomeDiscord() {
  const invite = siteConfig.links.discord.replace(/^https?:\/\//, "");

  return (
    <section
      id="discord"
      aria-labelledby="discord-heading"
      className="site-container scroll-mt-28 pb-24 md:pb-32"
    >
      <Reveal>
        <a
          href={siteConfig.links.discord}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col items-center text-center"
        >
          <DiscordMark className="size-12 text-[#5865f2] transition-colors duration-300 group-hover:text-[#4752c4]" />

          <h2
            id="discord-heading"
            className="mt-8 max-w-3xl font-display text-4xl leading-[0.96] font-semibold tracking-[-0.06em] text-balance text-foreground sm:text-5xl lg:text-6xl"
          >
            Join the Glyph Discord.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            Wallet help, release notes, and build talk, straight from the people
            making Glyph.
          </p>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#5865f2] px-5 py-3 text-sm font-medium text-white transition-colors group-hover:bg-[#4752c4]">
            Open Discord
            <SiteIcon icon={ArrowRightUpIcon} size={16} />
          </span>

          <span className="mt-3 font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground">
            {invite}
          </span>
        </a>
      </Reveal>
    </section>
  );
}
