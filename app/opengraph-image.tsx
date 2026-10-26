import { createOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Glyph | Open-source Qubic ecosystem";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    title: "Open-source Qubic ecosystem",
    description: "A self-custodial wallet and developer tools for Qubic.",
  });
}
