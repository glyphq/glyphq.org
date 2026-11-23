// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://glyphq.org",
  integrations: [
    react(),
    mdx({ shikiConfig: { theme: "vesper" } }),
    sitemap({
      filter: (page) => !page.includes("/404") && !page.includes("/og/"),
    }),
  ],
  prefetch: { prefetchAll: true },
  markdown: { shikiConfig: { theme: "vesper" } },
  vite: {
    plugins: [tailwindcss()],
  },
});
