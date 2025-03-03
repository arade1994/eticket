import { afterEach, vi } from "vitest";

import { cleanup, configure } from "@testing-library/react";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

configure({ testIdAttribute: "id" });
