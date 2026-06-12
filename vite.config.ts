import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const nitroPreset =
  process.env.NITRO_PRESET ??
  (process.env.VERCEL ? "vercel" : process.env.NETLIFY ? "netlify" : undefined);

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: nitroPreset ? { preset: nitroPreset } : {},
});
