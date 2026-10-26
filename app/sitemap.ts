import type { MetadataRoute } from "next";
import { sponsorsConfigured } from "@/lib/sponsors";

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
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  if (sponsorsConfigured) {
    routes.push({
      url: `${baseUrl}/sponsors`,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return routes;
}
