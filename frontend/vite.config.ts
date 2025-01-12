import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "prompt",
      workbox: {
        skipWaiting: true,
        globPatterns: ["**/*.{js,ts,vue,css,html,png,svg,ico}"],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  esbuild: {
    target: "esnext",
    platform: "node",
  },
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "https://api.supabase.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
