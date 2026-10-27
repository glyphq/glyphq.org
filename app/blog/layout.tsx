import type { ReactNode } from "react";
import { BlogShell } from "@/components/blog-shell";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="relative h-24 sm:h-28 md:h-32">
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative bg-background">
        <div className="site-container">
          <div className="pt-12 pb-16 md:pt-16 md:pb-20">
            <BlogShell>{children}</BlogShell>
          </div>
        </div>
      </div>
    </div>
  );
}
