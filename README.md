# glyphq landing

Landing site for [glyphq.org](https://glyphq.org), built with Astro.

This version uses a monochrome Graphite theme with semantic theme tokens, Space Grotesk display
type, Geist Sans body copy, Geist Mono interface labels, flat surfaces, a full-width header,
hairline section frames, and corner-only borders on interactive elements and cards. Page heroes use
the Asciify Drift field with a text-shaped clear map. The route shell swaps instantly; only
content-level reveal animations remain.

## Stack

| Layer     | Choice                                |
| --------- | ------------------------------------- |
| Framework | Astro 7 with React islands            |
| Styling   | Tailwind CSS 4                        |
| Motion    | Motion (Framer Motion) for navigation |
| Icons     | Gravity UI Icons                      |
| Hero      | Asciify Engine (Drift)                |
| Effects   | CSS corner frames and hairline masks  |
| Code      | Shiki                                 |
| Runtime   | Bun 1.4.4                             |
| Lint      | Biome and `astro check`               |
| Tests     | Vitest                                |
| Deploy    | Workers static assets                 |

## Routes

| Route              | Page                                    |
| ------------------ | --------------------------------------- |
| `/`                | Home                                    |
| `/products`        | Product index                           |
| `/products/[slug]` | One page per product                    |
| `/showcase`        | Projects built with Glyph               |
| `/support`         | Donations                               |
| `/download`        | OS detection, release assets, changelog |
| `/changelog`       | Wallet release notes                    |
| `/principles`      | Supporting page                         |
| `/developers`      | Supporting page                         |
| `/404`             | Not found                               |

Navigation uses a client router with prefetch. Release data and changelog notes
come from the public GitHub releases API at build time. The download page uses the browser platform
to suggest the matching build. The support page reads the Qubic donation identity live from the Glyph API at
`api.glyphq.org`. Showcase thumbnails fall back to GitHub OpenGraph images.

## Commands

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `bun install`       | Install dependencies and git hooks        |
| `bun dev`           | Start the dev server on port 4321         |
| `bun run check`     | Run Biome and Astro type checks           |
| `bun run check:fix` | Apply Biome fixes                         |
| `bun run test`      | Run Vitest                                |
| `bun run build`     | Build the static site to `dist/`          |
| `bun run deploy`    | Build and deploy the Worker with Wrangler |

Start the dev server in the background with `astro dev --background`.

## Deployment

Deploys run on `.github/workflows/deploy.yml`. The workflow needs:

- `vars.CLOUDFLARE_ACCOUNT_ID`
- `secrets.CLOUDFLARE_API_TOKEN`

`bun run deploy` builds the site and applies the Alchemy stack in `alchemy.run.ts`. It owns the
`glyphq-landing` Worker, its static assets, and the `glyphq.org` custom domain. The Worker serves
`dist/404.html` for unknown routes.

Download and support analytics live in the separate `analytics-worker` project. The landing
calls it same-origin at `/api`, routed to that Worker; `/api/downloads` and
`/api/support?ttl=120` are the public endpoints. The Worker seeds the historical wallet-installer total from GitHub
once, calculates development-window progress, caches support data, and rate-limits tracked
downloads per IP. The navbar uses a five-minute cache; support components use two minutes.
Override the endpoint with `PUBLIC_ANALYTICS_URL` if needed.

## Commits

Commits follow Conventional Commits through `commitlint` and `lefthook`:

- `type(scope): subject`
- lower-case scope and subject
- one of `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`
- no body or footer
