import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    watch: true,
    setupFiles: "./vitest-setup.ts",
    coverage: {
      enabled: true,
      reporter: ["text", "text-summary", "json", "lcov"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
