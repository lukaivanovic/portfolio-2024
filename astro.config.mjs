import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

import vue from "@astrojs/vue";

import react from "@astrojs/react";

export default defineConfig({
  integrations: [vue(), react()],
  output: "server",

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});