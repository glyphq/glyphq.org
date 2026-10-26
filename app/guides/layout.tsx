import type { ReactNode } from "react";

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/*
        The site backdrop is anchored to the top of the document. This band is
        the only place it shows through; the reading sheet below paints over it
        so no guide copy ever sits on the ASCII artwork.
      */}
      <div aria-hidden="true" className="relative h-24 sm:h-28 md:h-32">
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative bg-background">
        <div className="site-container">
          <div className="mx-auto max-w-3xl pt-12 pb-24 md:pt-16 md:pb-32">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
