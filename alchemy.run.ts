import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";

export default Alchemy.Stack(
  "glyphq-landing",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const site = yield* Cloudflare.Website.StaticSite("landing", {
      name: "glyphq-landing",
      command: "bun run build",
      cwd: ".",
      outdir: "dist",
      compatibility: { date: "2026-11-22" },
      domain: { name: "glyphq.org" },
      assets: {
        notFoundHandling: "404-page",
      },
    });

    return { url: site.url };
  }),
);
