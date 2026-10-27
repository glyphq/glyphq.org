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
  async redirects() {
    return [
      { source: "/sponsors", destination: "/donate", permanent: true },
      { source: "/guides", destination: "/blog", permanent: true },
      {
        source: "/guides/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
    ];
  },
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
      "rehype-slug",
      ["rehype-pretty-code", { theme: "vesper", keepBackground: false }],
    ],
  },
});

export default withMDX(nextConfig);
