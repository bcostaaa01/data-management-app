import { defineConfig as defineVitestConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineVitestConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/tests/**/*.{ts,tsx,vue}"],
  },
});
