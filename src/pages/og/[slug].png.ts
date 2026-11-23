import { readFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import { createElement as h } from "react";
import satori from "satori";
import { type OgPage, ogImageSize, ogPages } from "../../lib/seo";

const font = readFileSync(`${process.cwd()}/src/assets/og/space-grotesk.ttf`);
const mono = readFileSync(
  `${process.cwd()}/node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2`,
);
const logo = readFileSync(`${process.cwd()}/public/brand/glyph-on-dark.png`);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
const fieldGlyphs = " .:-=+*#";

const asciiRows = (rows: number, columns: number, offset: number) =>
  Array.from({ length: rows }, (_, y) =>
    Array.from({ length: columns }, (_, x) => {
      const value =
        (Math.sin(x * 0.075 + y * 0.9 + offset) +
          Math.sin(x * 0.031 - y * 1.4 + offset * 0.7) +
          1.8) /
        3.6;
      const glyph = Math.min(
        fieldGlyphs.length - 1,
        Math.max(0, Math.floor(value * fieldGlyphs.length)),
      );
      return fieldGlyphs[glyph];
    }).join(""),
  );

const topRows = asciiRows(5, 180, 0.4);
const bottomRows = asciiRows(4, 180, 2.1);

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
          overflow: "hidden",
          position: "relative",
          boxSizing: "border-box",
          padding: "64px 72px",
          background: "#0D0E0F",
          color: "#ECEEEE",
          fontFamily: "Space Grotesk",
        },
      },
      h(
        "div",
        {
          key: "field-top",
          style: {
            position: "absolute",
            top: "-6px",
            left: "-8px",
            right: "-8px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            color: "#8F8D86",
            fontFamily: "Geist Mono",
            fontSize: "11px",
            lineHeight: "13px",
            opacity: 0.16,
            whiteSpace: "pre",
          },
        },
        ...topRows.map((row, index) => h("div", { key: `top-${index}` }, row)),
      ),
      h(
        "div",
        {
          key: "field-bottom",
          style: {
            position: "absolute",
            bottom: "-6px",
            left: "-8px",
            right: "-8px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            color: "#8F8D86",
            fontFamily: "Geist Mono",
            fontSize: "11px",
            lineHeight: "13px",
            opacity: 0.16,
            whiteSpace: "pre",
          },
        },
        ...bottomRows.map((row, index) => h("div", { key: `bottom-${index}` }, row)),
      ),
      h("div", {
        key: "corner-tl",
        style: {
          position: "absolute",
          top: "26px",
          left: "26px",
          width: "18px",
          height: "18px",
          borderTop: "1px solid #5C6164",
          borderLeft: "1px solid #5C6164",
        },
      }),
      h("div", {
        key: "corner-tr",
        style: {
          position: "absolute",
          top: "26px",
          right: "26px",
          width: "18px",
          height: "18px",
          borderTop: "1px solid #5C6164",
          borderRight: "1px solid #5C6164",
        },
      }),
      h("div", {
        key: "corner-bl",
        style: {
          position: "absolute",
          bottom: "26px",
          left: "26px",
          width: "18px",
          height: "18px",
          borderBottom: "1px solid #5C6164",
          borderLeft: "1px solid #5C6164",
        },
      }),
      h("div", {
        key: "corner-br",
        style: {
          position: "absolute",
          bottom: "26px",
          right: "26px",
          width: "18px",
          height: "18px",
          borderBottom: "1px solid #5C6164",
          borderRight: "1px solid #5C6164",
        },
      }),
      h(
        "div",
        {
          key: "header",
          style: {
            display: "flex",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          },
        },
        h("img", { src: logoSrc, width: 56, height: 56, alt: "" }),
        h("span", { style: { fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em" } }, "Glyph"),
      ),
      h(
        "div",
        {
          key: "main",
          style: {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            position: "relative",
            gap: "24px",
            textAlign: "left",
          },
        },
        h(
          "div",
          {
            style: {
              display: "flex",
              maxWidth: "1000px",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.06em",
              lineHeight: 1.02,
              textAlign: "left",
            },
          },
          title,
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              maxWidth: "880px",
              fontSize: 28,
              lineHeight: 1.35,
              color: "#A0A4A5",
              textAlign: "left",
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
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
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
