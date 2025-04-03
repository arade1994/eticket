import { describe, expect, test } from "vitest";

import { render, screen } from "@testing-library/react";

import Features from "./Features";

describe("<Features />", () => {
  test("should match a snapshot when rendered by default", () => {
    const { baseElement } = render(<Features />);

    expect(baseElement).toMatchSnapshot();
  });

  test("should contain all features listed", () => {
    render(<Features />);

    const features = screen
      .getAllByRole("heading")
      ?.map((feature) => feature.innerHTML)
      ?.filter(Boolean);

    expect(features.includes("Easy Ticket Management")).toBeTruthy();
    expect(features.includes("Social Features")).toBeTruthy();
    expect(features.includes("Event Details")).toBeTruthy();
    expect(features.includes("Smart Notifications")).toBeTruthy();
    expect(features.includes("Chat System")).toBeTruthy();
    expect(features.includes("Customizable Settings")).toBeTruthy();
    expect(features.includes("Categories &amp; Tags")).toBeTruthy();
  });
});
