export type PostKind = "Guide" | "Changelog";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  kind: PostKind;
  category: string;
  date: string;
};

export const posts: readonly BlogPost[] = [
  {
    slug: "install-and-setup",
    title: "Install and set up Glyph",
    description:
      "Download the wallet for your desktop, create a Vault, and back up your seed before you add funds.",
    kind: "Guide",
    category: "Wallet",
    date: "2026-10-26",
  },
  {
    slug: "send-qubic",
    title: "Send QU",
    description:
      "Move QU to an identity or contact, receive with a QR code, and track a transfer from broadcast to confirmation.",
    kind: "Guide",
    category: "Wallet",
    date: "2026-10-26",
  },
  {
    slug: "connect-a-dapp",
    title: "Connect a dApp",
    description:
      "Build a Glyph deep-link request with @glyph-oss/connect, deliver the result safely, and verify what comes back.",
    kind: "Guide",
    category: "Developers",
    date: "2026-10-26",
  },
];

export const sortedPosts = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  timeZone: "UTC",
});

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

export function formatPostDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function formatPostDay(date: string) {
  return dayFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function formatPostMonthYear(date: string) {
  return monthYearFormatter.format(new Date(`${date}T00:00:00Z`));
}
