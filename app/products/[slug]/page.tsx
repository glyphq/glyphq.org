import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccentBox } from "@/components/accent-box";
import { CodeBlock, type CodeLanguage } from "@/components/code-block";
import { Reveal } from "@/components/reveal";
import { SiteButtonLink } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { pageMetadata } from "@/lib/page-metadata";
import {
  getOtherProducts,
  getProduct,
  type ProductFeature,
  type ProductTech,
  products,
} from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return pageMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    image: "/products/opengraph-image",
  });
}

function codeLanguage(code: string): CodeLanguage {
  if (code.startsWith("import ")) return "ts";
  if (/^[A-Z][A-Z0-9_]+=/.test(code)) return "text";

  return "bash";
}

function FeatureGrid({ features }: { features: ProductFeature[] }) {
  return (
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
      {features.map((feature) => (
        <div key={feature.title}>
          <h3 className="font-display text-lg font-medium tracking-[-0.02em]">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function TechContent({ tech }: { tech: ProductTech }) {
  return (
    <div className="min-w-0 space-y-6">
      {tech.kind === "code" ? (
        <CodeBlock code={tech.code} lang={codeLanguage(tech.code)} />
      ) : (
        <ul className="space-y-7">
          {tech.endpoints.map((endpoint) => (
            <li key={`${endpoint.method}-${endpoint.path}`}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs tracking-[0.12em] text-brand uppercase">
                  {endpoint.method}
                </span>
                <span className="font-mono text-sm break-all text-foreground">
                  {endpoint.path}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                {endpoint.description}
              </p>
            </li>
          ))}
        </ul>
      )}
      {tech.note ? (
        <p className="font-mono text-xs leading-relaxed text-muted-foreground">
          {tech.note}
        </p>
      ) : null}
    </div>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const otherProducts = getOtherProducts(product.slug);

  return (
    <>
      <section className="site-container pt-12 pb-16 md:pt-20 md:pb-24">
        <Reveal className="max-w-5xl" mount>
          <Link
            href="/products"
            className="text-sm text-foreground transition-colors hover:text-brand"
          >
            All products
          </Link>

          <h1 className="mt-12 font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.07em] text-balance">
            Glyph <AccentBox>{product.name}</AccentBox>
          </h1>

          {product.status ? (
            <p className="mt-4 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
              {product.status}
            </p>
          ) : null}

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {product.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {product.ctas.map((cta) => (
              <SiteButtonLink
                key={`${cta.label}-${cta.href}`}
                href={cta.href}
                external={cta.external}
                variant={cta.variant ?? "primary"}
                size="md"
              >
                {cta.label}
                {cta.external ? (
                  <SiteIcon icon={ArrowRightUpIcon} size={16} />
                ) : null}
              </SiteButtonLink>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="bg-background">
        <section
          aria-labelledby="product-intro-heading"
          className="site-container pb-24 md:pb-32"
        >
          <Reveal className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <h2
                id="product-intro-heading"
                className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
              >
                {product.name} at a glance.
              </h2>
            </div>
            <div className="max-w-2xl space-y-8">
              <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                {product.intro}
              </p>
              <FeatureGrid features={product.features} />
            </div>
          </Reveal>
        </section>

        {product.tech ? (
          <section
            aria-labelledby="product-tech-heading"
            className="site-container pb-24 md:pb-32"
          >
            <Reveal className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div>
                <h2
                  id="product-tech-heading"
                  className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
                >
                  {product.tech.title}
                </h2>
                {product.tech.description ? (
                  <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                    {product.tech.description}
                  </p>
                ) : null}
              </div>
              <TechContent tech={product.tech} />
            </Reveal>
          </section>
        ) : null}

        <section
          aria-labelledby="other-products-heading"
          className="site-container pb-24 md:pb-32"
        >
          <Reveal className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <h2
                id="other-products-heading"
                className="max-w-md font-display text-4xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-5xl"
              >
                More from Glyph.
              </h2>
            </div>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {otherProducts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/products/${other.slug}`}
                  className="group max-w-sm"
                >
                  <span className="flex items-center gap-2 font-display text-2xl font-medium tracking-[-0.03em]">
                    {other.name}
                    <SiteIcon
                      icon={ArrowRightUpIcon}
                      size={14}
                      className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground text-pretty">
                    {other.shortDescription}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
