import { products } from "../data/site";

export interface OgPage {
  slug: string;
  title: string;
  description: string;
}

const topLevelPages: OgPage[] = [
  {
    slug: "home",
    title: "A wallet and toolchain for Qubic",
    description: "Self-custodial desktop wallet, explorer, and developer tools for Qubic.",
  },
  {
    slug: "download",
    title: "Download Glyph",
    description: "The self-custodial Qubic wallet for Windows, macOS, and Linux.",
  },
  {
    slug: "products",
    title: "The Glyph toolchain",
    description: "Wallet, explorer, and developer tools for Qubic.",
  },
  {
    slug: "support",
    title: "Support Glyph",
    description: "Donations fund development and infrastructure.",
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "Release notes for Glyph Wallet.",
  },
  {
    slug: "showcase",
    title: "Showcase",
    description: "Apps using Glyph Wallet and the Glyph toolchain.",
  },
  {
    slug: "developers",
    title: "Build with Glyph",
    description: "Install the SDK, use typed contracts, and read the docs.",
  },
  {
    slug: "principles",
    title: "How Glyph works",
    description: "Self-custodial by design, built for everyday Qubic use.",
  },
];

const productPages: OgPage[] = products.map((product) => ({
  slug: product.slug,
  title: product.name,
  description: product.summary,
}));

export const ogPages: OgPage[] = [...topLevelPages, ...productPages];

export const ogImageSize = { width: 1200, height: 630 } as const;
export const ogImageVersion = "2026-11-22-2";

export const ogSlugForPath = (pathname: string) => {
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  if (!clean) return "home";

  if (clean.startsWith("products/")) {
    const slug = clean.split("/")[1];
    return ogPages.some((page) => page.slug === slug) ? slug : "products";
  }

  if (clean.startsWith("changelog/")) return "changelog";

  return ogPages.some((page) => page.slug === clean) ? clean : "home";
};

export const canonicalUrlForPath = (pathname: string, site: URL) => {
  const canonicalPath = pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`;
  return new URL(canonicalPath, site).href;
};
