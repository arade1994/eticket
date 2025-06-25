import { describe, expect, test } from "vitest";

import { render, screen } from "@testing-library/react";

import mockDb from "../../../mock/db.json";
import { type User } from "../../../types/user";

import HeaderActions from "./HeaderActions";

const mockCurrentUser = mockDb.currentUser as unknown as User;

describe("<HeaderActions />", () => {
  test("it should match a snapshot when user is signed in by default", () => {
    const { baseElement } = render(
      <HeaderActions currentUser={mockCurrentUser} />
    );

    expect(baseElement).toMatchSnapshot("Signed In");

    const notificationsBtn = screen.getByLabelText("notifications-bell");
    expect(notificationsBtn).toBeDefined();
    const signOutLink = screen.getByText("Sign Out");
    expect(signOutLink).toBeDefined();
  });

  test("it should match a snapshot when user is signed out by default", () => {
    const { baseElement } = render(<HeaderActions />);

    expect(baseElement).toMatchSnapshot("Signed Out");

    const signInLink = screen.getByText("Sign In");
    expect(signInLink).toBeDefined();
  });
});
