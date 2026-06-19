import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { redwood } from "rwsdk/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    tailwindcss(),
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
    redwood(),
  ],
});
