import { createOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Donate to Glyph";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    title: "Donate to Glyph",
    description:
      "Support the wallet and the open tools around it. EVM and Qubic.",
  });
}
