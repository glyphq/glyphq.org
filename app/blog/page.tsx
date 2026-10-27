import Link from "next/link";
import { pageMetadata } from "@/lib/page-metadata";
import {
  type BlogPost,
  formatPostDay,
  formatPostMonthYear,
  sortedPosts,
} from "@/lib/posts";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Guides and changelogs from the Glyph build: wallet setup, QU transfers, Connect, and release notes.",
  path: "/blog",
});

function PostRow({ post }: { post: BlogPost }) {
  return (
    <li className="border-t border-foreground/10 first:border-t-0">
      <Link
        href={`/blog/${post.slug}`}
        className="group grid gap-4 rounded-2xl py-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[6.5rem_minmax(0,1fr)] md:items-start md:gap-8 md:py-10 lg:grid-cols-[7rem_minmax(0,1fr)]"
      >
        <time
          dateTime={post.date}
          className="font-mono tracking-[0.12em] uppercase"
        >
          <span className="block text-xl leading-none text-foreground/80 transition-colors group-hover:text-brand">
            {formatPostDay(post.date)}
          </span>
          <span className="mt-1.5 block text-[0.6rem] text-muted-foreground">
            {formatPostMonthYear(post.date)}
          </span>
        </time>

        <div className="md:col-start-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase">
            <span
              className={
                post.kind === "Changelog" ? "text-[#ffd3b8]" : "text-brand"
              }
            >
              {post.kind}
            </span>
            <span className="text-muted-foreground">{post.category}</span>
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight font-medium tracking-[-0.035em] text-balance transition-colors group-hover:text-brand sm:text-4xl">
            {post.title}
          </h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            {post.description}
          </p>
        </div>
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
        <div className="flex items-center justify-between border-b border-foreground/10 pb-3 font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
          <span>Latest first</span>
          <span>
            {sortedPosts.length} {sortedPosts.length === 1 ? "post" : "posts"}
          </span>
        </div>
        <ol aria-label="Blog posts" className="list-none">
          {sortedPosts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ol>
      </div>
    </>
  );
}
