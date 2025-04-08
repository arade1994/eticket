import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    watch: true,
    setupFiles: "./vitest-setup.ts",
    coverage: {
      reportsDirectory: "./tests/unit/coverage",
    },
  },
});
