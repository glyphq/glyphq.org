// @ts-check

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const alchemyBuild = Boolean(process.env.ALCHEMY_ASTRO_BUILD);
const adapter =
  alchemyBuild || process.env.VITEST ? undefined : cloudflare({ prerenderEnvironment: "node" });

// https://astro.build/config
export default defineConfig({
  site: "https://glyphq.org",
  output: "server",
  adapter,
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
