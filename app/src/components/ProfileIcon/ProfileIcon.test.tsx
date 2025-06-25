import { describe, expect, test } from "vitest";

import { render, screen } from "@testing-library/react";

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
