import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import FormErrors from "./FormErrors";

const mockErrorMessages = [
  { message: "First name should be at least two characters long" },
  { message: "Age must be a positive number" },
];

describe("<FormErrors />", () => {
  test("it should display box with errors enlisted", () => {
    const { baseElement } = render(<FormErrors errors={mockErrorMessages} />);
    expect(baseElement).toMatchSnapshot();

    const errorMessage_1 = screen.getByText(mockErrorMessages[0].message);
    const errorMessage_2 = screen.getByText(mockErrorMessages[1].message);
    expect(errorMessage_1).toBeDefined();
    expect(errorMessage_2).toBeDefined();
  });
});
