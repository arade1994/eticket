import { afterAll, afterEach, vi } from "vitest";

import { cleanup, configure } from "@testing-library/react";

vi.useFakeTimers();

process.env.TZ = "Europe/Belgrade";

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
