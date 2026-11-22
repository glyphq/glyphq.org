import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import ProductCard from "./product-card.astro";

describe("product card", () => {
  it("renders the product name, summary, and destination", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProductCard, {
      props: {
        slug: "wallet",
        name: "Glyph Wallet",
        summary: "Self-custodial desktop wallet for Qubic.",
        href: "https://glyphq.org/download",
        icon: "solar:wallet-linear",
      },
    });

    expect(html).toContain("Glyph Wallet");
    expect(html).toContain("Self-custodial desktop wallet for Qubic.");
    expect(html).toContain('href="https://glyphq.org/download"');
  });
});
