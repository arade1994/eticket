import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import Header from "./Header";
import { User } from "../../types/user";

const mockCurrentUser = {
  id: "userId",
  firstName: "Test",
  lastName: "Test",
  age: 24,
  email: "test@test.com",
  password: "test",
} as User;

describe("<Header />", () => {
  afterEach(() => cleanup());

  test("It should match a snapshot when user is logged out", () => {
    const { baseElement } = render(<Header />);

    expect(baseElement).toMatchSnapshot("Logged out user");
  });

  test("It should display specific navigation items when user is logged out", () => {
    render(<Header />);

    const navigationLinks = screen.getAllByRole("link");
    expect(navigationLinks).toBeDefined();
    expect(navigationLinks.length).toEqual(3);
    expect(navigationLinks[0].textContent).toEqual("eTicket");
    expect(navigationLinks[1].textContent).toEqual("Sign In");
    expect(navigationLinks[2].textContent).toEqual("Sign Up");
  });

  test("It should match a snapshot when user is logged in", () => {
    const { baseElement } = render(<Header currentUser={mockCurrentUser} />);

    expect(baseElement).toMatchSnapshot("Logged in user");
  });

  test("It should display specific navigation items when user is logged in", async () => {
    render(<Header currentUser={mockCurrentUser} />);

    const navigationLinks = screen.getAllByRole("link");
    expect(navigationLinks).toBeDefined();
    expect(navigationLinks.length).toEqual(1);
    expect(navigationLinks[0].textContent).toEqual("eTicket");
  });
});
