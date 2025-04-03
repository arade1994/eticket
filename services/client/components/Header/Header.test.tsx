import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";

import Header from "./Header";

vi.mock("./HeaderActions/HeaderActions.tsx", () => ({
  default: () => "<HeaderActions />",
}));
vi.mock("./HeaderNavigation/HeaderNavigation.tsx", () => ({
  default: () => "<HeaderNavigation />",
}));

describe("<Header />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(<Header />);

    expect(baseElement).toMatchSnapshot();

    const logo = screen.getByText("eTicket");
    expect(logo).toBeDefined();
  });
});
