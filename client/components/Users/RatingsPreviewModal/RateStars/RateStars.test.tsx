import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import RateStars from "./Users/RatingsPreviewModal/RateStars/RateStars";

describe("<RateStars />", () => {
  test("It should display rate stars component as expected", () => {
    const { baseElement } = render(<RateStars rate={4} />);

    expect(baseElement).toMatchSnapshot();

    const stars = screen.getAllByLabelText("star");
    expect(stars.length).toEqual(5);
    const selectedStars = stars.filter((star) =>
      star.classList.contains("checked")
    );
    expect(selectedStars.length).toEqual(4);
  });
});
