import { afterAll, afterEach, vi } from "vitest";

import { cleanup, configure } from "@testing-library/react";

vi.stubGlobal("Intl", {
  DateTimeFormat: () => ({
    resolvedOptions: () => ({
      timeZone: "Europe/Belgrade",
    }),
  }),
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

afterAll(() => {
  vi.useRealTimers();
});

configure({ testIdAttribute: "id" });
