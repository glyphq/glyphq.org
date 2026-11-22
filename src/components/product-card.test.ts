import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import ProductCard from "./product-card.astro";

describe("product card", () => {
  it("renders the product copy, features, and destination", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProductCard, {
      props: {
        tag: "Explorer",
        title: "Search the chain",
        description: "Every block and transaction on Qubic.",
        href: "https://explorer.glyphq.org",
        features: ["Blocks", "Transactions"],
      },
    });

    expect(html).toContain("Search the chain");
    expect(html).toContain("Blocks");
    expect(html).toContain('href="https://explorer.glyphq.org"');
  });
});
