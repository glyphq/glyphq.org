import Link from "next/link";
import { RelativeDate } from "@/components/relative-date";
import { getPost } from "@/lib/posts";

export function PostHeader({ slug }: { slug: string }) {
  const post = getPost(slug);

  if (!post) return null;

  return (
    <header className="mb-12 max-w-3xl">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[0.65rem] tracking-[0.14em]">
        <Link
          href="/blog"
          className="text-foreground/75 transition-colors hover:text-brand"
        >
          All posts
        </Link>
        <span aria-hidden="true" className="text-foreground/25">
          /
        </span>
        <span
          className={
            post.kind === "Changelog" ? "text-[#ffd3b8]" : "text-brand"
          }
        >
          {post.kind}
        </span>
        <span aria-hidden="true" className="text-foreground/25">
          /
        </span>
        <span className="text-muted-foreground">{post.category}</span>
        <span aria-hidden="true" className="text-foreground/25">
          /
        </span>
        <RelativeDate
          date={post.date}
          className="font-sans tracking-normal text-muted-foreground"
        />
      </div>

      <h1 className="mt-6 max-w-2xl font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
        {post.description}
      </p>
      <p className="mt-5 font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase">
        By alez04
      </p>
    </header>
  );
}
