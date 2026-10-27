import Link from "next/link";
import { RelativeDate } from "@/components/relative-date";
import { pageMetadata } from "@/lib/page-metadata";
import { type BlogPost, sortedPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Guides and changelogs from the Glyph build: wallet setup, QU transfers, Connect, and release notes.",
  path: "/blog",
});

function PostRow({ post }: { post: BlogPost }) {
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl py-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:py-10"
      >
        <div className="flex flex-wrap items-center gap-2 text-[0.6rem] font-medium tracking-[0.08em] uppercase">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1",
              post.kind === "Changelog"
                ? "bg-[#ffd3b8] text-[#0a0a0a]"
                : "bg-brand text-brand-foreground",
            )}
          >
            {post.kind}
          </span>
          <span className="inline-flex items-center rounded-full bg-foreground/10 px-2.5 py-1 text-muted-foreground">
            {post.category}
          </span>
        </div>
        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight font-medium tracking-[-0.035em] text-balance transition-colors group-hover:text-brand sm:text-4xl">
          {post.title}
        </h2>
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
          {post.description}
        </p>
        <RelativeDate
          date={post.date}
          className="mt-4 block font-mono text-[0.6rem] tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-foreground"
        />
      </Link>
    </li>
  );
}

export default function BlogPage() {
  return (
    <>
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl">
          The Glyph blog.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          Guides and changelogs from the build.
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-5xl">
        <ol aria-label="Blog posts" className="list-none">
          {sortedPosts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ol>
      </div>
    </>
  );
}
