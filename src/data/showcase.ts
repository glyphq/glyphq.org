export interface ShowcaseProduct {
  title: string;
  description: string;
  href: string;
  image: string;
  favicon: string;
}

export const showcaseProducts: ShowcaseProduct[] = [
  {
    title: "Q+Pay",
    description:
      "Accept Qubic payments with invoices, point-of-sale checkout, tip jars, and plugins for WooCommerce and Shopify. Non-custodial.",
    href: "https://useqpay.com/",
    image: "https://useqpay.com/media/og-image-logo.png",
    favicon: "https://useqpay.com/media/favicon-32.png",
  },
  {
    title: "QubicSwap",
    description:
      "Trade Qubic tokens and shares through a decentralized exchange interface with order books and liquidity pools.",
    href: "https://qubicswap.com/",
    image: "https://qubicswap.com/images/og/og-tokens.png",
    favicon: "https://www.google.com/s2/favicons?domain=qubicswap.com&sz=64",
  },
];
