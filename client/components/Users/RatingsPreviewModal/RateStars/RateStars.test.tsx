import { describe, expect, test } from "vitest";

import { render, screen } from "@testing-library/react";

import RateStars from "./RateStars";

describe("<RateStars />", () => {
  test("It should display rate stars component as expected", () => {
    const { baseElement } = render(<RateStars rate={4} />);

    expect(baseElement).toMatchSnapshot();

    const stars = screen.getAllByLabelText("star");
    expect(stars.length).toEqual(4);
  });
});
