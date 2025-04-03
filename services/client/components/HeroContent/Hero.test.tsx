import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import mockDb from "../../mock/db.json";
import { type User } from "../../types/user";

import HeroContent from "./Hero";

const mockCurrentUser = mockDb.currentUser as unknown as User;

const mockRouterPush = vi.fn();

vi.mock("next/router", async () => {
  const actualRouter = await vi.importActual("next/router");

  return {
    ...actualRouter,
    useRouter: vi.fn().mockImplementation(() => ({ push: mockRouterPush })),
  };
});

describe("<Hero />", () => {
  test("it should match a snapshot when user is signed in by default", async () => {
    const { baseElement } = render(
      <HeroContent currentUser={mockCurrentUser} />
    );

    expect(baseElement).toMatchSnapshot("Signed in");

    const browseTicketsBtn = screen.getByText("Browse Tickets");
    expect(browseTicketsBtn).toBeDefined();
    await userEvent.click(browseTicketsBtn);
    expect(mockRouterPush).toHaveBeenCalled();
  });

  test("it should match a snapshot when user is signed out by default", async () => {
    const { baseElement } = render(<HeroContent />);

    expect(baseElement).toMatchSnapshot("Signed out");

    const getStartedBtn = screen.getByText("Get Started Now");
    expect(getStartedBtn).toBeDefined();
    await userEvent.click(getStartedBtn);
    expect(mockRouterPush).toHaveBeenCalled();
  });
});
