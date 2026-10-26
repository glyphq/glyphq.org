"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { TableOfContents } from "@/components/table-of-contents";

export function BlogShell({ children }: { children: ReactNode }) {
  const isIndex = usePathname() === "/blog";

  if (isIndex) {
    return <div className="mx-auto max-w-5xl">{children}</div>;
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 xl:grid-cols-[minmax(0,48rem)_12rem] xl:items-start xl:justify-center">
      <div className="mx-auto w-full min-w-0 max-w-3xl xl:mx-0 xl:max-w-none">
        {children}
      </div>
      <TableOfContents />
    </div>
  );
}
