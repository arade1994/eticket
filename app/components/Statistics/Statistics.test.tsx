import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import Statistics from "./Statistics";

describe("<Statistics />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(<Statistics />);

    expect(baseElement).toMatchSnapshot();
  });
});
