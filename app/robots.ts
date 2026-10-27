import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://glyphq.org/sitemap.xml",
    host: "https://glyphq.org",
  };
}
