import { createOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Download Glyph";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    title: "Download Glyph",
    description:
      "The self-custodial Qubic wallet for Windows, macOS, and Linux.",
  });
}
