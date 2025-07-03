import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInForm from "./SignInForm";

const mockSendRequest = vi.fn();

vi.mock("../../hooks/useRequest", async () => {
  const actualModule = await vi.importActual("../../hooks/useRequest");

  return {
    ...actualModule,
    useRequest: vi.fn().mockImplementation(() => ({
      sendRequest: mockSendRequest,
      errors: [],
    })),
  };
});

describe("<SignInForm />", () => {
  test("it should render sign in form as expected", () => {
    const { baseElement } = render(<SignInForm />);

    expect(baseElement).toMatchSnapshot();
  });

  test("it should render input for email address", async () => {
    render(<SignInForm />);

    const emailInput = screen.getByTestId("email") as HTMLInputElement;
    expect(emailInput).toBeDefined();
    await userEvent.type(emailInput, "test@test.com");
    expect(emailInput.value).toEqual("test@test.com");
  });

  test("it should render input for password", async () => {
    render(<SignInForm />);

    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    expect(passwordInput).toBeDefined();
    await userEvent.type(passwordInput, "password");
    expect(passwordInput.value).toEqual("password");
  });

  test("it should render submit button", () => {
    render(<SignInForm />);

    const signInBtn = screen.getByRole("button");
    expect(signInBtn).toBeDefined();
    expect(signInBtn.textContent).toEqual("Sign In");
  });

  test("it should call send request method when data are populated correctly", async () => {
    render(<SignInForm />);

    const emailInput = screen.getByTestId("email") as HTMLInputElement;
    await userEvent.type(emailInput, "test@test.com");
    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    await userEvent.type(passwordInput, "password");
    const signInBtn = screen.getByRole("button");
    await userEvent.click(signInBtn);
    expect(mockSendRequest).toHaveBeenCalled();
  });
});
