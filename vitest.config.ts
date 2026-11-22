import { getViteConfig } from "astro/config";
import type { ViteUserConfig } from "vitest/config";

const config: ViteUserConfig = {
  test: {
    include: ["src/**/*.test.ts"],
  },
};

export default getViteConfig(config);
