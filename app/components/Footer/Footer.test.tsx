import { describe, expect, test } from "vitest";

import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("<Footer />", () => {
  test("should match a snapshot when rendered by default", () => {
    const { baseElement } = render(<Footer />);

    expect(baseElement).toMatchSnapshot();
  });

  test("should display links for about, contact, terms and privacy", () => {
    render(<Footer />);

    const aboutLink = screen.getByText("About");
    expect(aboutLink).toBeDefined();
    const contactLink = screen.getByText("Contact");
    expect(contactLink).toBeDefined();
    const termsLink = screen.getByText("Terms");
    expect(termsLink).toBeDefined();
    const privacyLink = screen.getByText("Privacy");
    expect(privacyLink).toBeDefined();
  });

  test("should display icon links for Facebook, Twitter and LinkedIn", () => {
    render(<Footer />);

    const facebookLink = screen.getByLabelText("Facebook");
    expect(facebookLink).toBeDefined();
    const twitterLink = screen.getByLabelText("Twitter");
    expect(twitterLink).toBeDefined();
    const linkedInLink = screen.getByLabelText("LinkedIn");
    expect(linkedInLink).toBeDefined();
  });
});
