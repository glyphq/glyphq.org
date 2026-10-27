# glyphq.org

The public site for **Glyph**, a self-custodial desktop wallet and a set of open-source tools for [Qubic](https://qubic.org).

[glyphq.org](https://glyphq.org) · [Docs](https://docs.glyphq.org) · [Discord](https://discord.gg/faKATpcHGf)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-000000?logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-000000?logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-000000?logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-1.4-000000?logo=bun&logoColor=white)](https://bun.sh)

## What is this?

This repository is the marketing and content site for the Glyph ecosystem. It covers the wallet, Connect SDK, Relay, Explorer, and the Glyph API, plus the blog, downloads, and the project's donations page.

The site is dark only. It uses a restrained palette, Geist for interface text, Geist Mono for technical labels, and generated ASCII artwork for large accents. There is no light theme and no CMS. Content lives in TypeScript and MDX alongside the app.

## Stack

| Layer           | Choice                                                 |
| --------------- | ------------------------------------------------------ |
| Framework       | Next.js 16 App Router                                  |
| UI              | React 19, Tailwind CSS 4                               |
| Language        | TypeScript                                             |
| Content         | MDX, `remark-gfm`, `rehype-pretty-code`, `rehype-slug` |
| Motion          | `motion/react`                                         |
| Icons           | Solar Icons                                            |
| Quality         | Biome, Husky, lint-staged, commitlint                  |
| Package manager | Bun                                                    |
| Releases        | Changesets                                             |

## Quick start

You need Bun 1.4.4 or newer.

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

The production build runs on any Node.js host:

```bash
bun run build
bun run start
```

## Scripts

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `bun dev`           | Start the development server              |
| `bun run build`     | Create a production build                 |
| `bun run start`     | Serve the production build                |
| `bun run check`     | Run Biome lint, format, and import checks |
| `bun run check:fix` | Apply Biome fixes                         |
| `bun run typecheck` | Generate route types and run TypeScript   |
| `bun run changeset` | Add a changeset for a user-facing change  |

Run `check`, `typecheck`, and `build` before opening a pull request.

## Routes

| Route              | Purpose                               |
| ------------------ | ------------------------------------- |
| `/`                | Home page                             |
| `/products`        | Product overview                      |
| `/products/[slug]` | Wallet, Connect, Relay, Explorer, API |
| `/download`        | OS-aware wallet downloads             |
| `/blog`            | Guides and changelogs, newest first   |
| `/blog/[slug]`     | Individual post                       |
| `/blog/og/[slug]`  | Generated social card for a post      |
| `/about`           | Project background                    |
| `/donate`          | Donations, addresses, and balances    |

`/guides` and `/guides/*` permanently redirect to `/blog` and `/blog/*`. `/sponsors` redirects to `/donate`.

## Project layout

```text
app/                 Routes, layouts, metadata, and MDX posts
  blog/              Blog index, post pages, and OG route
  products/          Product index and detail pages
components/          UI, ASCII treatments, navigation, and content widgets
lib/                 Site data, posts, products, releases, donations, helpers
public/              Brand assets, chain icons, masks, and OS icons
```

## Content

### Blog posts

Posts are MDX files under `app/blog/<slug>/page.mdx`. Each post is registered in `lib/posts.ts`:

```ts
{
  slug: "install-and-setup",
  title: "Install and set up Glyph",
  description: "Download the wallet, create a Vault, and back up your seed.",
  kind: "Guide",
  category: "Wallet",
  date: "2026-10-20",
}
```

`kind` is `Guide` or `Changelog`. The index sorts by date, newest first. Every post starts with a shared header:

```mdx
<PostHeader slug="install-and-setup" />

<BlogArticle>
  ...post content...
</BlogArticle>
```

The header uses the post metadata. The social card at `/blog/og/<slug>` is generated from the same metadata. Headings get IDs from `rehype-slug`, which powers the sticky table of contents.

We no longer use the `/guides` content type. Old links redirect to the blog.

### Products

Product names, links, short descriptions, feature lists, and status live in `lib/products.ts`. Navigation and footer links live in `lib/site.ts`.

The download page reads the latest public GitHub release from `lib/releases.ts`. No token is required. The route is cached and revalidates every 15 minutes.

### Donations

Donation addresses live in `lib/donations.ts`. The donated-so-far figure is USDT and USDC plus the USD value of the Qubic balance, using a live CoinGecko price with a $400 per billion fallback. Balances are fetched from public RPCs and cached for one minute. Sponsor entries and the $500 sponsor threshold live in `lib/sponsors.ts`.

## Design notes

These are the rules that keep the site coherent:

- Dark only. The accent is `#ccfcfb`.
- Use Geist for interface text and Geist Mono for addresses, versions, and small technical labels.
- Use generated `GradientASCII` artwork for the top backdrop and accent banners. Do not hand-draw ASCII figures.
- Use masks sparingly. The home page has one key mask. Product pages use their own accent banners.
- Hover states change color, not position. Avoid lift, translate, and scale effects on links and cards.
- Subpage headers and descriptions are centered.
- Keep the 404 page simple. No blockchain jargon.

Most of these choices are expressed in `app/globals.css` and the shared components rather than in per-page styles.

## Commits and releases

Commits follow conventional commits, lower case, with a scope, and no body:

```text
type(scope): short natural language description
```

Examples:

```text
feat(site): add landing page hero
fix(blog): keep post navigation aligned
chore(tooling): update biome
```

A Husky hook validates the message, and a pre-commit hook runs Biome on staged files. User-facing changes should include a changeset:

```bash
bun run changeset
```

## Deployment

The site builds as a standard Next.js app. Vercel works without extra configuration. If you deploy elsewhere, provide a Node.js runtime and run:

```bash
bun install --frozen-lockfile
bun run build
bun run start
```

No environment variables are required for the current feature set.
