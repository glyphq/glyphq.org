import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import { DiscordAscii } from "@/components/discord-ascii";
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
          className="group relative isolate flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#1e1f22] p-7 transition-colors duration-300 ease-out hover:bg-[#25272b] md:min-h-[22rem] md:p-12"
        >
          <DiscordAscii />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1e1f22] via-[#1e1f22]/80 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2.5 text-[#a9b4ff]">
              <DiscordMark className="size-5" />
              <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase">
                Discord
              </span>
            </div>
            <h2
              id="discord-heading"
              className="mt-7 font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance text-[#f2f3ff] sm:text-5xl"
            >
              Built in the open.
              <br />
              <span className="text-[#a9b4ff]">Yours to verify.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#c9cdf5]/80 text-pretty sm:text-base">
              The wallet source, releases, and documentation are public. Ask
              questions, follow releases, or join the conversation.
            </p>
          </div>

          <div className="relative z-10 mt-10 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#5865f2] px-5 py-3 text-sm font-medium text-white transition-colors group-hover:bg-[#4752c4]">
              Join Discord
              <SiteIcon icon={ArrowRightUpIcon} size={16} />
            </span>
            <span className="font-mono text-[0.65rem] tracking-[0.14em] text-[#a9b4ff]/60 uppercase">
              Open invite
            </span>
          </div>
        </a>
      </Reveal>
    </section>
  );
}
