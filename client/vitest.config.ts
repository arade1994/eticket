import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { configure } from "@testing-library/react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    watch: true,
  },
});

configure({ testIdAttribute: "id" });
