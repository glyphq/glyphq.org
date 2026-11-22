// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { glyphShikiTheme } from "./src/styles/shiki-theme.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react(), mdx({ shikiConfig: { theme: glyphShikiTheme } })],
  prefetch: { prefetchAll: true },
  markdown: { shikiConfig: { theme: glyphShikiTheme } },
  vite: {
    plugins: [tailwindcss()],
  },
});
