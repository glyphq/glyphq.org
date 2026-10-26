import { createOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "About Glyph";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    title: "About Glyph",
    description: "A Qubic wallet built for the desktop, in the open.",
  });
}
