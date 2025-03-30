import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpForm from "./SignUpForm";

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

describe("<SignUpForm />", () => {
  test("it should render sign up form as expected", () => {
    const { baseElement } = render(<SignUpForm />);

    expect(baseElement).toMatchSnapshot();
  });

  test("it should render input for first name", async () => {
    render(<SignUpForm />);

    const firstNameInput = screen.getByTestId("firstName") as HTMLInputElement;
    expect(firstNameInput).toBeDefined();
    await userEvent.type(firstNameInput, "Test");
    expect(firstNameInput.value).toEqual("Test");
  });

  test("it should render input for last name", async () => {
    render(<SignUpForm />);

    const lastNameInput = screen.getByTestId("lastName") as HTMLInputElement;
    expect(lastNameInput).toBeDefined();
    await userEvent.type(lastNameInput, "Test");
    expect(lastNameInput.value).toEqual("Test");
  });

  test("it should render input for age", async () => {
    render(<SignUpForm />);

    const ageInput = screen.getByTestId("age") as HTMLInputElement;
    expect(ageInput).toBeDefined();
    await userEvent.type(ageInput, "25");
    expect(ageInput.value).toEqual("25");
  });

  test("it should render input for age", async () => {
    render(<SignUpForm />);

    const emailInput = screen.getByTestId("email") as HTMLInputElement;
    expect(emailInput).toBeDefined();
    await userEvent.type(emailInput, "test@test.com");
    expect(emailInput.value).toEqual("test@test.com");
  });

  test("it should render input for age", async () => {
    render(<SignUpForm />);

    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    expect(passwordInput).toBeDefined();
    await userEvent.type(passwordInput, "test1234");
    expect(passwordInput.value).toEqual("test1234");
  });

  test("it should render submit button", () => {
    render(<SignUpForm />);

    const signUpBtn = screen.getByRole("button");
    expect(signUpBtn).toBeDefined();
    expect(signUpBtn.textContent).toEqual("Sign Up");
  });

  test("it should call send request method when data are populated correctly", async () => {
    render(<SignUpForm />);

    const firstNameInput = screen.getByTestId("firstName") as HTMLInputElement;
    await userEvent.type(firstNameInput, "Test");

    const lastNameInput = screen.getByTestId("lastName") as HTMLInputElement;
    await userEvent.type(lastNameInput, "Test");

    const ageInput = screen.getByTestId("age") as HTMLInputElement;
    await userEvent.type(ageInput, "25");

    const emailInput = screen.getByTestId("email") as HTMLInputElement;
    await userEvent.type(emailInput, "test@test.com");

    const passwordInput = screen.getByTestId("password") as HTMLInputElement;
    await userEvent.type(passwordInput, "password");

    const signInBtn = screen.getByRole("button");
    signInBtn.click();
    expect(mockSendRequest).toHaveBeenCalled();
  });
});
