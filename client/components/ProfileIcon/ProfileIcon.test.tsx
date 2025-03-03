import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ProfileIcon from "./ProfileIcon";

describe("<ProfileIcon />", () => {
  test("it should render profile icon component as expected", () => {
    const { baseElement } = render(
      <ProfileIcon firstName="Mick" lastName="Jones" />
    );

    expect(baseElement).toMatchSnapshot();

    const initials = screen.getByText("MJ");
    expect(initials).toBeDefined();
  });
});
