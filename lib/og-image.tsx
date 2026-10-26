import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { asciiDarkColors } from "@/lib/ascii-palette";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const logo = readFileSync(
  join(process.cwd(), "public/brand/glyph-on-dark.png"),
);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

const asciiCharacters = " =+xX0S8#@";
const asciiRows = Array.from({ length: 12 }, (_, row) => ({
  id: `ascii-row-${row}`,
  cells: Array.from({ length: 100 }, (_, column) => {
    const x = column / 99;
    const y = row / 11;
    const distanceX = x - 0.5;
    const distanceY = y - 0.55;
    const glow = Math.exp(
      -(distanceX * distanceX * 5 + distanceY * distanceY * 9),
    );
    const wave = 0.5 + 0.5 * Math.sin(x * 16 + y * 8);
    const noise =
      Math.abs(Math.sin(column * 12.9898 + row * 78.233) * 43758.5453) % 1;
    const tone = Math.min(1, 0.06 + glow * 0.7 + wave * 0.12 + noise * 0.3);
    const characterIndex = Math.min(
      asciiCharacters.length - 1,
      Math.floor(tone * asciiCharacters.length),
    );
    const colorIndex = Math.min(
      asciiDarkColors.length - 1,
      Math.floor(tone * asciiDarkColors.length),
    );
    return {
      id: `ascii-cell-${row}-${column}`,
      character: asciiCharacters[characterIndex],
      color: asciiDarkColors[colorIndex],
      opacity: 0.18 + tone * 0.55,
    };
  }),
}));

export function createOgImage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "#f8f7f2",
        padding: "64px 72px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 250,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "monospace",
          fontSize: 18,
          lineHeight: 1.1,
          letterSpacing: 0.8,
          opacity: 0.7,
        }}
      >
        {asciiRows.map((row) => (
          <div key={row.id} style={{ display: "flex" }}>
            {row.cells.map((cell) => (
              <span
                key={cell.id}
                style={{ color: cell.color, opacity: cell.opacity }}
              >
                {cell.character}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.85), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(to bottom, transparent, #0a0a0a)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          position: "relative",
        }}
      >
        {/* biome-ignore lint/performance/noImgElement: OG image logo data URL */}
        <img src={logoSrc} width={48} height={48} alt="" />
        <span style={{ fontSize: 28, fontWeight: 600 }}>Glyph</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: "-0.06em",
            lineHeight: 1.02,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            lineHeight: 1.25,
            color: "#9b9ca1",
            maxWidth: 900,
          }}
        >
          {description}
        </div>
      </div>
    </div>,
    { ...ogSize },
  );
}
