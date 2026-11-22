// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { glyphShikiTheme } from "./src/styles/shiki-theme.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://glyphq.org",
  integrations: [
    icon(),
    react(),
    mdx({ shikiConfig: { theme: glyphShikiTheme } }),
    sitemap({
      filter: (page) => !page.includes("/404") && !page.includes("/og/"),
    }),
  ],
  prefetch: { prefetchAll: true },
  markdown: { shikiConfig: { theme: glyphShikiTheme } },
  vite: {
    plugins: [tailwindcss()],
  },
});
