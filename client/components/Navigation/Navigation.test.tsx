import { describe, expect, test } from "vitest";

import { render, screen } from "@testing-library/react";

import Navigation from "./Navigation";

describe("<Navigation />", () => {
  test("it should contain all the navigation links by default", () => {
    const { baseElement } = render(<Navigation />);

    expect(baseElement).toMatchSnapshot();

    const ticketsLink = screen.getByText("Tickets");
    const ordersLink = screen.getByText("Orders");
    const usersLink = screen.getByText("Users");
    const signOutLink = screen.getByText("Sign out");

    expect(ticketsLink).toBeDefined();
    expect(ordersLink).toBeDefined();
    expect(usersLink).toBeDefined();
    expect(signOutLink).toBeDefined();
  });
});
