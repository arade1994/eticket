import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";

import mockDb from "../../../mock/db.json";
import { type User } from "../../../types/user";

import HeaderNavigation from "./HeaderNavigation";

const mockCurrentUser = mockDb.currentUser as unknown as User;

vi.mock("next/router", async () => {
  const actualRouter = await vi.importActual("next/router");

  return {
    ...actualRouter,
    useRouter: vi.fn().mockImplementation(() => ({ pathname: "" })),
  };
});

describe("<HeaderNavigation />", () => {
  test("it should match a snapshot when user is signed in by default", async () => {
    const { baseElement } = render(
      <HeaderNavigation currentUser={mockCurrentUser} />
    );

    expect(baseElement).toMatchSnapshot("Signed in");

    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeDefined();
    const ticketsLink = screen.getByText("Tickets");
    expect(ticketsLink).toBeDefined();
    const ordersLink = screen.getByText("Orders");
    expect(ordersLink).toBeDefined();
    const usersLink = screen.getByText("Users");
    expect(usersLink).toBeDefined();
  });

  test("it should match a snapshot when user is signed out by default", () => {
    const { baseElement } = render(<HeaderNavigation />);

    expect(baseElement).toMatchSnapshot();
  });
});
