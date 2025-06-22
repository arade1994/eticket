import { describe, expect, test } from "vitest";

import { formatDateToHHMM } from "./date";

describe("formatDateToHHMM()", () => {
  test("it should format date to hh:mm format", () => {
    expect(formatDateToHHMM("2025-02-27T20:27:17.870Z")).toEqual("21:27");
  });
});
