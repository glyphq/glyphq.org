import { ArrowRightIcon } from "@solar-icons/react/linear";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteIcon } from "@/components/site-icon";
import { pageMetadata } from "@/lib/page-metadata";
import { type BlogPost, formatPostDate, sortedPosts } from "@/lib/posts";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Guides and changelogs from the Glyph build: wallet setup, QU transfers, Connect, and release notes.",
  path: "/blog",
});

function PostThumbnail({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <div
      className={className ?? "overflow-hidden rounded-xl bg-foreground/[0.04]"}
    >
      <Image
        src={`/blog/og/${post.slug}`}
        alt=""
        width={1200}
        height={630}
        className="aspect-[1200/630] w-full object-cover"
      />
    </div>
  );
}

function PostRow({ post, index }: { post: BlogPost; index: number }) {
  return (
    <li className="border-t border-foreground/10 first:border-t-0">
      <Reveal delay={index * 0.04}>
        <Link
          href={`/blog/${post.slug}`}
          className="group grid gap-4 py-8 md:grid-cols-[7rem_minmax(0,1fr)_14rem] md:items-start md:gap-6 md:py-10 lg:grid-cols-[7rem_minmax(0,1fr)_18rem] lg:gap-8"
        >
          <time
            dateTime={post.date}
            className="font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase"
          >
            {formatPostDate(post.date)}
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
            <h2 className="mt-3 max-w-xl font-display text-2xl leading-tight font-medium tracking-[-0.035em] text-balance transition-colors group-hover:text-brand sm:text-3xl">
              {post.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
              {post.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              Read {post.kind.toLowerCase()}
              <SiteIcon icon={ArrowRightIcon} size={14} />
            </span>
          </div>

          <PostThumbnail
            post={post}
            className="hidden overflow-hidden rounded-xl bg-foreground/[0.04] md:block"
          />
        </Link>
      </Reveal>
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

      <ol className="mx-auto mt-14 max-w-5xl list-none">
        {sortedPosts.map((post, index) => (
          <PostRow key={post.slug} post={post} index={index} />
        ))}
      </ol>
    </>
  );
}
