"use client";

import { ArrowRightIcon } from "@solar-icons/react/linear";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteIcon } from "@/components/site-icon";
import { TableOfContents } from "@/components/table-of-contents";
import { sortedPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

function PostNavigation({ slug }: { slug: string }) {
  const index = sortedPosts.findIndex((post) => post.slug === slug);

  if (index === -1) return null;

  const newer = index > 0 ? sortedPosts[index - 1] : undefined;
  const older =
    index < sortedPosts.length - 1 ? sortedPosts[index + 1] : undefined;

  return (
    <nav
      aria-label="More posts"
      className="mt-16 border-t border-foreground/10 pt-8"
    >
      <p className="font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
        More posts
      </p>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        {newer ? (
          <Link href={`/blog/${newer.slug}`} className="group block">
            <span className="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">
              Newer
            </span>
            <span className="mt-2 block font-display text-xl leading-tight font-medium tracking-[-0.03em] transition-colors group-hover:text-brand">
              {newer.title}
            </span>
          </Link>
        ) : null}
        {older ? (
          <Link
            href={`/blog/${older.slug}`}
            className={cn(
              "group block",
              newer && "sm:col-start-2 sm:text-right",
            )}
          >
            <span className="font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground uppercase">
              Older
            </span>
            <span className="mt-2 block font-display text-xl leading-tight font-medium tracking-[-0.03em] transition-colors group-hover:text-brand">
              {older.title}
            </span>
          </Link>
        ) : null}
      </div>
      <Link
        href="/blog"
        className="mt-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        All posts
        <SiteIcon icon={ArrowRightIcon} size={14} />
      </Link>
    </nav>
  );
}

export function BlogShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isIndex = pathname === "/blog";

  if (isIndex) {
    return <div className="mx-auto max-w-5xl">{children}</div>;
  }

  const slug = pathname.replace(/^\/blog\//, "").replace(/\/$/, "");

  return (
    <div className="mx-auto grid max-w-6xl gap-12 xl:grid-cols-[minmax(0,48rem)_12rem] xl:items-start xl:justify-center">
      <div className="mx-auto w-full min-w-0 max-w-3xl xl:mx-0 xl:max-w-none">
        {children}
        <PostNavigation slug={slug} />
      </div>
      <TableOfContents />
    </div>
  );
}
