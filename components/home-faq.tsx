import { Faq } from "@/components/faq";
import { Reveal } from "@/components/reveal";

const faqs = [
  {
    question: "Does Glyph hold my keys?",
    answer:
      "No. Vaults are encrypted on your computer and the password stays local. Your seed is the only recovery method, so keep an offline backup.",
  },
  {
    question: "Which desktops does Glyph support?",
    answer:
      "Glyph runs on Windows x64, macOS, and Linux. It is a desktop app, not a browser or mobile wallet.",
  },
  {
    question: "Is Glyph open source?",
    answer:
      "Yes. The wallet, Connect, Relay, and Explorer are public. You can read the source, follow releases, or build the wallet yourself.",
  },
  {
    question: "How do I connect a Qubic dApp?",
    answer:
      "Use @glyph-oss/connect to build a typed request, then approve it in the desktop wallet. The Connect guide covers the full flow.",
  },
] as const;

export function HomeFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="home-faq-heading"
      className="site-container scroll-mt-28 pb-24 md:pb-32"
    >
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <Reveal>
          <h2
            id="home-faq-heading"
            className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
          >
            Questions, answered.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
            Short answers about custody, downloads, and connecting apps.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Faq items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
