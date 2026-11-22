# glyphq landing

Landing page for [glyphq.org](https://glyphq.org), built with Astro.

This version is a dark-only wireframe. It uses the Glyph logo from the existing site, Space Grotesk, Solar icons, and
text-only placeholder content, with no custom illustrations.

## Stack

Inside of your Astro project, you'll see the following folders and files:

## Commands

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

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
