export const siteConfig = {
  name: "Glyph",
  url: "https://glyphq.org",
  description:
    "A self-custodial desktop wallet and open-source tools for Qubic.",
  links: {
    docs: "https://docs.glyphq.org",
    github: "https://github.com/glyphq",
    wallet: "https://github.com/glyphq/wallet",
    connect: "https://github.com/glyphq/connect",
    relay: "https://github.com/glyphq/relay",
    explorer: "https://explorer.glyphq.org",
    explorerRepo: "https://github.com/glyphq/explorer",
    releases: "https://github.com/glyphq/wallet/releases/latest",
    discord: "https://discord.gg/s5qNRNGu96",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Guides", href: "/guides" },
  { label: "Download", href: "/download" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "About", href: "/about" },
];

export const productLinks: NavItem[] = [
  {
    label: "Wallet",
    href: "/products/wallet",
    description: "Self-custodial desktop wallet for Qubic.",
  },
  {
    label: "Connect",
    href: "/products/connect",
    description: "Typed SDK for wallet requests and approvals.",
  },
  {
    label: "Relay",
    href: "/products/relay",
    description: "Transport for dApp callbacks over SSE.",
  },
  {
    label: "Explorer",
    href: "/products/explorer",
    description: "Network data for Qubic identities and activity.",
  },
  {
    label: "Glyph API",
    href: "/products/api",
    description: "Programmatic access for Qubic data. In progress.",
  },
];

export const resourceLinks: NavItem[] = [
  { label: "Documentation", href: siteConfig.links.docs, external: true },
  { label: "GitHub", href: siteConfig.links.github, external: true },
  { label: "Releases", href: siteConfig.links.releases, external: true },
  { label: "Discord", href: siteConfig.links.discord, external: true },
];

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
