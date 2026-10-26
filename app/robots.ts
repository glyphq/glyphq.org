import type { MetadataRoute } from "next";
import { sponsorsConfigured } from "@/lib/sponsors";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      ...(sponsorsConfigured ? {} : { disallow: "/sponsors" }),
    },
    sitemap: "https://glyphq.org/sitemap.xml",
    host: "https://glyphq.org",
  };
}
