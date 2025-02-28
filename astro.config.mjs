import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

import vue from "@astrojs/vue";

export default defineConfig({
  integrations: [tailwind(), vue()],
  output: "server",

  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
