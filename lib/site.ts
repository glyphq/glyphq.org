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
  icon?: ComponentType<IconProps>;
};

export const mainNav: NavItem[] = [
  { label: "Products", href: "/products", icon: Grid2x2Icon },
  { label: "Download", href: "/download", icon: DownloadIcon },
  { label: "Sponsors", href: "/sponsors", icon: HeartIcon },
  { label: "About", href: "/about", icon: InfoCircleIcon },
];

export const productLinks: NavItem[] = [
  {
    label: "Wallet",
    href: "/products#wallet",
    description: "Self-custodial desktop wallet for Qubic.",
    icon: WalletIcon,
  },
  {
    label: "Connect",
    href: "/products#connect",
    description: "Typed SDK for wallet requests and approvals.",
    icon: Code2Icon,
  },
  {
    label: "Relay",
    href: "/products#relay",
    description: "Transport for dApp callbacks over SSE.",
    icon: LinkIcon,
  },
  {
    label: "Explorer",
    href: "/products#explorer",
    description: "Network data for Qubic identities and activity.",
    icon: GlobalIcon,
  },
  {
    label: "Glyph API",
    href: "/products#api",
    description: "Programmatic access for Qubic data. In progress.",
    icon: CodeSquareIcon,
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

import type { IconProps } from "@solar-icons/react/lib/types";
import {
  Code2Icon,
  CodeSquareIcon,
  DownloadIcon,
  GlobalIcon,
  Grid2x2Icon,
  HeartIcon,
  InfoCircleIcon,
  LinkIcon,
  WalletIcon,
} from "@solar-icons/react/linear";
import type { ComponentType } from "react";
