import { Faq } from "@/components/faq";
import { Reveal } from "@/components/reveal";

const faqs = [
  {
    question: "Does Glyph hold my keys?",
    answer:
      "No. Vaults are encrypted on your computer. Your seed is the only way to recover an account, so keep an offline backup.",
  },
  {
    question: "Which desktops does Glyph support?",
    answer: "Windows x64, macOS, and Linux. Glyph runs as a desktop app.",
  },
  {
    question: "Is Glyph open source?",
    answer:
      "Yes. The wallet, Connect, Relay, and Explorer are public on GitHub.",
  },
  {
    question: "How do I connect a Qubic dApp?",
    answer:
      "Build a typed request with @glyph-oss/connect, then approve it in the desktop wallet.",
  },
] as const;

export function HomeFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="home-faq-heading"
      className="site-container scroll-mt-28 pb-24 md:pb-32"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <h2
            id="home-faq-heading"
            className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
          >
            Common questions.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
            Short answers about the wallet and connecting apps.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <Faq items={faqs} defaultOpen={0} />
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Still stuck?{" "}
            <a
              href="#discord"
              className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
            >
              Ask in Discord
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
