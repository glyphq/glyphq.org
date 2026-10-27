"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const root = document.querySelector(".blog-article");
    if (!root) return;

    const headings = [
      ...root.querySelectorAll<HTMLElement>("h2[id], h3[id]"),
    ].map((heading) => ({
      element: heading,
      id: heading.id,
      text: heading.textContent?.trim() ?? "",
      level: heading.tagName === "H2" ? (2 as const) : (3 as const),
    }));

    setItems(headings);
    if (!headings.length) return;

    const update = () => {
      const threshold = window.scrollY + 160;
      let current = headings[0]?.id;

      for (const heading of headings) {
        const top =
          heading.element.getBoundingClientRect().top + window.scrollY;
        if (top <= threshold) current = heading.id;
      }

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!items.length) return null;

  return (
    <aside className="sticky top-28 hidden max-h-[calc(100svh-8rem)] overflow-y-auto xl:block">
      <p className="font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">
        On this page
      </p>
      <nav aria-label="On this page" className="mt-4">
        <ol className="space-y-2.5">
          {items.map((item) => (
            <li key={item.id} className={cn(item.level === 3 && "pl-4")}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "block text-sm leading-snug transition-colors",
                  active === item.id
                    ? "text-brand"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
