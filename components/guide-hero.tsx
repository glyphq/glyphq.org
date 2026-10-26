import Image from "next/image";
import Link from "next/link";
import GradientASCII from "@/components/gradient-ascii";
import { asciiDarkColors } from "@/lib/ascii-palette";
import { formatPostDate, getPost } from "@/lib/posts";

export function GuideHero({ slug }: { slug: string }) {
  const post = getPost(slug);

  if (!post) return null;

  return (
    <header className="relative isolate mb-12 overflow-hidden rounded-[2rem] bg-[#0a0a0a] px-6 py-10 text-center md:px-10 md:py-12">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <GradientASCII
          colors={asciiDarkColors}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.7}
          glyphOpacity={0.75}
          glow={0.3}
          flicker={0.08}
          softness={0.5}
          scale={1}
          flow={0.5}
          speed={0.3}
          gradientOpacity={0.8}
          grain={0.06}
          variation={3}
          mouseInteraction={false}
          clickEffect="none"
          intro={false}
          lightMode={false}
          dpr={1.5}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/15 via-background/45 to-background/90" />

      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/brand/glyph-on-dark.png"
          alt=""
          width={40}
          height={40}
          className="size-10"
          priority
        />

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
          <Link
            href="/blog"
            className="text-foreground/75 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
          >
            All posts
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-brand">{post.kind}</span>
          <span aria-hidden="true">/</span>
          <span>{post.category}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </div>

        <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
          {post.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
          {post.description}
        </p>
        <p className="mt-5 font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase">
          By alez04
        </p>
      </div>
    </header>
  );
}
