import { readFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import { createElement as h } from "react";
import satori from "satori";
import { type OgPage, ogImageSize, ogPages } from "../../lib/seo";

const font = readFileSync(`${process.cwd()}/src/assets/og/space-grotesk.ttf`);
const logo = readFileSync(`${process.cwd()}/public/brand/glyph-on-cream.png`);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
const productMaskSlugs = new Set(["wallet", "connect", "contracts", "relay", "explorer", "api"]);
const maskCache = new Map<string, string>();
const maskSrcFor = (slug: string) => {
  const name = productMaskSlugs.has(slug) ? slug : "hairline";
  const cached = maskCache.get(name);
  if (cached) return cached;

  const svg = readFileSync(`${process.cwd()}/public/masks/${name}.svg`)
    .toString()
    .replaceAll("#fff", "#e8d2b8");
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 620 } }).render().asPng();
  const src = `data:image/png;base64,${Buffer.from(png).toString("base64")}`;
  maskCache.set(name, src);
  return src;
};

export function getStaticPaths() {
  return ogPages.map((page) => ({ params: { slug: page.slug }, props: { page } }));
}

export const GET: APIRoute<{ page: OgPage }> = async ({ props }) => {
  const { title, description } = props.page;
  const svg = await satori(
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          position: "relative",
          boxSizing: "border-box",
          padding: "64px 72px",
          background: "#141414",
          color: "#F2EDE6",
          fontFamily: "Space Grotesk",
        },
      },
      h("img", {
        src: maskSrcFor(props.page.slug),
        width: 620,
        height: 413,
        alt: "",
        style: {
          position: "absolute",
          top: "-72px",
          right: "-88px",
          width: "620px",
          height: "413px",
          opacity: 0.2,
        },
      }),
      h("div", {
        style: {
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #E8D2B8, transparent)",
          opacity: 0.25,
        },
      }),
      h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "18px",
            position: "relative",
          },
        },
        h("img", { src: logoSrc, width: 112, height: 112, alt: "" }),
        h(
          "span",
          { style: { fontSize: 64, fontWeight: 600, letterSpacing: "-0.04em", color: "#E8D2B8" } },
          "Glyph",
        ),
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
          },
        },
        h(
          "div",
          {
            style: {
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.06em",
              lineHeight: 1.02,
              maxWidth: "1020px",
            },
          },
          title,
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              fontSize: 30,
              lineHeight: 1.25,
              color: "#A39C92",
              maxWidth: "920px",
            },
          },
          description,
        ),
      ),
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Space Grotesk", data: font, weight: 400, style: "normal" },
        { name: "Space Grotesk", data: font, weight: 700, style: "normal" },
      ],
    },
  );

  const png = new Uint8Array(new Resvg(svg).render().asPng());

  return new Response(png.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
