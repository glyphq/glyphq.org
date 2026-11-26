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
    const site = yield* Cloudflare.Website.Astro("landing", {
      name: "glyphq-landing",
      rootDir: ".",
      compatibility: { date: "2026-11-22" },
      domain: { name: "glyphq.org" },
      prerenderEnvironment: "node",
      sessionKVBindingName: false,
      assets: {
        notFoundHandling: "404-page",
        runWorkerFirst: ["/download", "/download/*", "/changelog", "/changelog/*"],
      },
    });

    return { url: site.url };
  }),
);
