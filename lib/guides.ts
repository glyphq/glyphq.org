export type GuideCategory = "Wallet" | "Developers";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
};

/**
 * Guides are ordered for display: the first entry leads the blog index.
 * Add new guides to the end of this list so the lead stays stable.
 */
export const guides: readonly Guide[] = [
  {
    slug: "install-and-setup",
    title: "Install and set up Glyph",
    description:
      "Download the wallet for your desktop, create a Vault, and back up your seed before you add funds.",
    category: "Wallet",
  },
  {
    slug: "send-qubic",
    title: "Send QU",
    description:
      "Move QU to an identity or contact, receive with a QR code, and track a transfer from broadcast to confirmation.",
    category: "Wallet",
  },
  {
    slug: "connect-a-dapp",
    title: "Connect a dApp",
    description:
      "Build a Glyph deep-link request with @glyph-oss/connect, deliver the result safely, and verify what comes back.",
    category: "Developers",
  },
];
