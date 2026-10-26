import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  allowedDevOrigins: ["192.168.1.134"],
};

const withMDX = createMDX({
  options: {
    // Turbopack needs plugin names as strings.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      ["rehype-pretty-code", { theme: "vesper", keepBackground: false }],
    ],
  },
});

export default withMDX(nextConfig);
