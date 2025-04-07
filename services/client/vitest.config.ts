import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    watch: true,
    setupFiles: "./vitest-setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["json", "text", "lcov"],
      reportsDirectory: "./coverage",
    },
  },
});
