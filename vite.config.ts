import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.CDN_URL || "/",
  plugins: [
    vue(),
    vuetify({ autoImport: true }) // Enabled by default
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        format: "iife",
        compact: true
      }
    }
  }
});
