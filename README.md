# glyphq landing

Landing page for [glyphq.org](https://glyphq.org), built with Astro.

This version is a dark-only wireframe. It uses the Glyph logo from the existing site, Space Grotesk, Solar icons, and
text-only placeholder content, with no custom illustrations.

## Stack

| Layer     | Choice                  |
| --------- | ----------------------- |
| Framework | Astro 7                 |
| Styling   | Tailwind CSS 4          |
| Runtime   | Bun 1.4.4               |
| Lint      | Biome and `astro check` |
| Tests     | Vitest                  |
| Deploy    | Workers static assets   |

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

`bun run deploy` builds `dist/` and uploads it as static assets for the `glyphq-landing` Worker.
Set a custom domain in `wrangler.jsonc` when the DNS cutover is approved.

## Commits

Commits follow Conventional Commits through `commitlint` and `lefthook`:

- `type(scope): subject`
- lower-case scope and subject
- one of `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`
- no body or footer
