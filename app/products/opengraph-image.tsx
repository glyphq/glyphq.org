import { createOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Glyph products";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    title: "Products",
    description: "Wallet, Connect, Relay, Explorer, and API.",
  });
}
