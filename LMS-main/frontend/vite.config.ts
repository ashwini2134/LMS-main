import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages deploys to /<repo-name>/ — set via VITE_BASE_PATH in CI.
  // Locally it defaults to "/" so `npm run dev` works without any env var.
  base: process.env.VITE_BASE_PATH ?? "/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    // No proxy needed — all data is served from /public/data/ as static files
  },
});
