import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function GuideMeta({ category }: { category: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm text-muted-foreground">
      <Link
        href="/guides"
        className="text-foreground/75 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        All guides
      </Link>
      <span aria-hidden="true" className="text-foreground/25">
        /
      </span>
      <span className="font-mono text-[0.7rem] tracking-[0.14em] text-brand uppercase">
        {category}
      </span>
      <span aria-hidden="true" className="text-foreground/25">
        /
      </span>
      <span>By alez04</span>
    </div>
  );
}

export function Callout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <aside className="my-8 flex gap-3">
      <span
        aria-hidden="true"
        className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-brand"
      />
      <div className="min-w-0 space-y-2">
        {title ? (
          <p className="font-mono text-[0.7rem] font-medium tracking-[0.16em] text-brand uppercase">
            {title}
          </p>
        ) : null}
        <div className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {children}
        </div>
      </div>
    </aside>
  );
}

const components = {
  h1: ({ children, ...props }) => (
    <Reveal mount>
      <h1
        className="font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
        {...props}
      >
        {children}
      </h1>
    </Reveal>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-14 font-display text-3xl leading-[1] font-semibold tracking-[-0.045em] text-balance sm:text-4xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-10 font-display text-xl font-medium tracking-[-0.02em]"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="mt-8 font-display text-lg font-medium tracking-[-0.015em]"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p
      className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty first:mt-0"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => {
    const external = href?.startsWith("http");

    return (
      <a
        href={href}
        className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-brand"
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 marker:text-muted-foreground"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 marker:text-muted-foreground"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="pl-1 text-base leading-relaxed text-muted-foreground"
      {...props}
    >
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-medium text-foreground" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 border-l-2 border-brand pl-5 text-base leading-relaxed text-muted-foreground italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  figure: ({ children, className, ...props }) => (
    <figure className={cn("mt-6 first:mt-0", className)} {...props}>
      {children}
    </figure>
  ),
  pre: ({ children, className, ...props }) => (
    <pre
      className={cn(
        "max-w-full overflow-x-auto rounded-2xl bg-foreground/5 p-5 font-mono text-xs leading-relaxed text-foreground/85",
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }) => {
    const isBlock =
      className?.includes("language-") || "data-language" in props;

    if (isBlock) {
      return (
        <code className={cn("font-mono", className)} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code
        className="rounded-md bg-foreground/8 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground [overflow-wrap:anywhere]"
        {...props}
      >
        {children}
      </code>
    );
  },
  table: ({ children, ...props }) => (
    <div className="mt-6 max-w-full overflow-x-auto">
      <table
        className="w-full min-w-[32rem] border-collapse text-left text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="text-foreground" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, className, ...props }) => (
    <th
      className={cn(
        "border-b border-foreground/15 px-3 py-2.5 font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, className, ...props }) => (
    <td
      className={cn(
        "border-b border-foreground/8 px-3 py-2.5 align-top text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </td>
  ),
  hr: (props) => (
    <hr className="my-12 border-0 border-t border-foreground/10" {...props} />
  ),
  GuideMeta,
  Callout,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
