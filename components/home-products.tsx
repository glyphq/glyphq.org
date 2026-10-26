import Link from "next/link";
import { ProductAsciiBanner } from "@/components/product-ascii-banner";
import { Reveal } from "@/components/reveal";
import { productLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const productLayout: Record<
  string,
  { span: string; banner: string; title: string; content: string }
> = {
  "/products/wallet": {
    span: "sm:col-span-2 lg:col-span-6",
    banner: "h-40",
    title: "text-4xl md:text-5xl",
    content: "pt-32",
  },
  "/products/connect": {
    span: "sm:col-span-2 lg:col-span-6",
    banner: "h-32",
    title: "text-3xl",
    content: "pt-24",
  },
  "/products/relay": {
    span: "sm:col-span-1 lg:col-span-4",
    banner: "h-28",
    title: "text-2xl md:text-3xl",
    content: "pt-24",
  },
  "/products/explorer": {
    span: "sm:col-span-1 lg:col-span-4",
    banner: "h-32",
    title: "text-2xl md:text-3xl",
    content: "pt-24",
  },
  "/products/api": {
    span: "sm:col-span-2 lg:col-span-4",
    banner: "h-32",
    title: "text-2xl md:text-3xl",
    content: "pt-24",
  },
};

export function HomeProducts() {
  return (
    <section
      aria-labelledby="products-heading"
      className="site-container pb-24 md:pb-32"
    >
      <Reveal className="max-w-3xl">
        <h2
          id="products-heading"
          className="font-display text-4xl leading-[0.96] font-semibold tracking-[-0.06em] text-balance sm:text-5xl lg:text-6xl"
        >
          One wallet.
          <br />
          <span className="text-muted-foreground">A full toolkit.</span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          Glyph starts with the wallet, then opens the Qubic network to apps,
          data, and services.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12">
        {productLinks.map((product, index) => {
          const layout = productLayout[product.href];

          if (!layout) return null;

          return (
            <Reveal
              key={product.href}
              className={cn("min-w-0", layout.span)}
              delay={index * 0.05}
            >
              <Link
                href={product.href}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-foreground/[0.035] p-7 transition-colors duration-300 ease-out hover:bg-foreground/[0.06] md:p-8"
              >
                <ProductAsciiBanner
                  href={product.href}
                  title={product.label}
                  className={layout.banner}
                  titleClassName={layout.title}
                />

                <div className={cn("relative z-10", layout.content)}>
                  <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
                    {product.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
