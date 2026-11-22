// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react(), mdx()],
  prefetch: { prefetchAll: true },
  vite: {
    plugins: [tailwindcss()],
  },
});
