import { ArrowRightIcon } from "@solar-icons/react/linear";
import Link from "next/link";
import { AccentBox } from "@/components/ascii/accent-box";
import { Reveal } from "@/components/ui/reveal";
import { SiteButtonLink } from "@/components/ui/site-button";
import { SiteIcon } from "@/components/ui/site-icon";
import { pageMetadata } from "@/lib/page-metadata";
import { products } from "@/lib/products";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "The Glyph ecosystem: a self-custodial Qubic wallet, Connect SDK, Relay, Explorer, and API.",
  path: "/products",
  image: "/products/opengraph-image",
});

export default function ProductsPage() {
  return (
    <section className="site-container pt-16 pb-24 md:pt-24 md:pb-32">
      <Reveal className="mx-auto max-w-4xl text-center" mount>
        <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
          Tools for <AccentBox>Qubic</AccentBox>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          A self-custodial wallet and the developer tools around it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <SiteButtonLink href="/download" size="md">
            Download Glyph
          </SiteButtonLink>
          <SiteButtonLink href="/blog" variant="secondary" size="md">
            Read the blog
          </SiteButtonLink>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.slug} className="min-w-0" delay={index * 0.05}>
            <Link
              href={`/products/${product.slug}`}
              className="group flex h-full max-w-md flex-col"
            >
              <span className="flex items-center justify-between gap-4">
                <span className="font-display text-3xl font-medium tracking-[-0.045em] transition-colors group-hover:text-brand sm:text-4xl">
                  {product.name}
                </span>
                <SiteIcon
                  icon={ArrowRightIcon}
                  size={18}
                  className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
                />
              </span>
              <span className="mt-3 block text-sm leading-relaxed text-muted-foreground text-pretty">
                {product.shortDescription}
              </span>
              {product.status ? (
                <span className="mt-4 font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase">
                  {product.status}
                </span>
              ) : null}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
