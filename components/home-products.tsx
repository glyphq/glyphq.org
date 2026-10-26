import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import Link from "next/link";
import { SiteIcon } from "@/components/site-icon";
import { productLinks } from "@/lib/site";

export function HomeProducts() {
  return (
    <section
      aria-labelledby="products-heading"
      className="site-container pb-24 md:pb-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div>
          <h2
            id="products-heading"
            className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
          >
            One wallet.
            <br />
            <span className="text-muted-foreground">A full toolkit.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            Glyph starts with the wallet, then opens the Qubic network to apps,
            data, and services.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {productLinks.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="group max-w-sm"
            >
              <span className="flex items-center gap-2 font-display text-2xl font-medium tracking-[-0.03em]">
                {product.label}
                <SiteIcon
                  icon={ArrowRightUpIcon}
                  size={14}
                  className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted-foreground text-pretty">
                {product.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
