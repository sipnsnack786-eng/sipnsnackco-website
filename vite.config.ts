import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { cssCodeSplit: true, assetsInlineLimit: 4096 },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
