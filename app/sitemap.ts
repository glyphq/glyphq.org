import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { products } from "@/lib/products";

const baseUrl = "https://glyphq.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/download`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: product.slug === "wallet" ? 0.9 : 0.7,
    })),
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/donate`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return routes;
}
