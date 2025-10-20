import devServer, { defaultOptions } from "@hono/vite-dev-server";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, loadEnv } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  if (process.env.QUESTS_INSIDE_STUDIO !== "true") {
    // When app is run outside Quests, this ensure .env* files are loaded
    // Removes need for VITE_ prefix in .env files for the server as well
    const env = loadEnv(mode, process.cwd(), "");
    process.env = env;
  }
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@client": path.resolve(__dirname, "./src/client"),
        "@server": path.resolve(__dirname, "./src/server"),
        "@game": path.resolve(__dirname, "./src/client/game"),
      },
    },
    plugins: [
      tsconfigPaths(),
      react(),
      tailwindcss(),
      devServer({
        // Exclude client folder from server because we only client render and
        // it interferes with image imports.
        exclude: [/src\/client\/.*/, ...defaultOptions.exclude],
        entry: "./src/server/index.ts",
      }),
    ],
    optimizeDeps: {
      // Phaser needs to be pre-bundled for proper loading
      include: ["phaser"],
    },
  };
});