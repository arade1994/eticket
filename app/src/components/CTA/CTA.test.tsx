import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CTA from "./CTA";

const mockRouterPush = vi.fn();

describe("<CTA />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(<CTA />);

    expect(baseElement).toMatchSnapshot();
  });

  test("it should display sign up now button which takes user to the sign up page", async () => {
    render(<CTA />);

    const signUpBtn = screen.getByRole("button");
    expect(signUpBtn).toBeDefined();
    await userEvent.click(signUpBtn);
    expect(mockRouterPush).toHaveBeenCalled();
  });
});
