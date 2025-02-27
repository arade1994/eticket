import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import CreateTicketModal from "./CreateTicketModal";
import userEvent from "@testing-library/user-event";

const mockOnClose = vi.fn();
const mockSendRequest = vi.fn();

vi.mock("../../../hooks/useRequest", async () => {
  const actualModule = await vi.importActual("../../../hooks/useRequest");

  return {
    ...actualModule,
    useRequest: vi.fn().mockImplementation(() => ({
      sendRequest: mockSendRequest,
      errors: [],
    })),
  };
});

describe("<CreateTicketModal />", () => {
  test("it should render create ticket modal by default", () => {
    const { baseElement } = render(
      <CreateTicketModal isOpen={true} onClose={mockOnClose} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  test("it should close modal when clicked on x", async () => {
    render(<CreateTicketModal isOpen={true} onClose={mockOnClose} />);

    const exitBtn = screen.getByTestId("exitBtn");
    expect(exitBtn).toBeDefined();
    await userEvent.click(exitBtn);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("it should render title input", async () => {
    render(<CreateTicketModal isOpen={true} onClose={mockOnClose} />);

    const titleInput = screen.getByTestId("title") as HTMLInputElement;
    expect(titleInput).toBeDefined();
    await userEvent.type(titleInput, "Title");
    expect(titleInput.value).toEqual("Title");
  });

  test("it should render price input", async () => {
    render(<CreateTicketModal isOpen={true} onClose={mockOnClose} />);

    const priceInput = screen.getByTestId("price") as HTMLInputElement;
    expect(priceInput).toBeDefined();
    await userEvent.type(priceInput, "200");
    expect(priceInput.value).toEqual("200");
  });

  test("it should render category selection", async () => {
    render(<CreateTicketModal isOpen={true} onClose={mockOnClose} />);

    const categorySelect = within(
      screen.getByTestId("categorySelect")
    ).getByText("Sport game");
    expect(categorySelect).toBeDefined();
    expect(categorySelect.textContent).toEqual("Sport game");
    await userEvent.click(categorySelect);
    await waitFor(() => screen.getByText("Theatre play"));
    await userEvent.click(screen.getByText("Theatre play"));
    expect(categorySelect.textContent).toEqual("Theatre play");
  });

  test("it should render cancel button", async () => {
    render(<CreateTicketModal isOpen={true} onClose={mockOnClose} />);

    const cancelBtn = screen.getByText("Cancel");
    expect(cancelBtn).toBeDefined();
    await userEvent.click(cancelBtn);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("it should render submit button", () => {
    render(<CreateTicketModal isOpen={true} onClose={mockOnClose} />);

    const submitBtn = screen.getByText("Submit");
    expect(submitBtn).toBeDefined();
  });

  test("it should call send request method when data are populated correctly", async () => {
    render(<CreateTicketModal isOpen={true} onClose={mockOnClose} />);

    const titleInput = screen.getByTestId("title") as HTMLInputElement;
    await userEvent.type(titleInput, "Title");

    const priceInput = screen.getByTestId("price") as HTMLInputElement;
    await userEvent.type(priceInput, "200");

    const categorySelect = within(
      screen.getByTestId("categorySelect")
    ).getByText("Sport game");
    await userEvent.click(categorySelect);
    await waitFor(() => screen.getByText("Theatre play"));
    await userEvent.click(screen.getByText("Theatre play"));

    const submitBtn = screen.getByText("Submit");
    submitBtn.click();
    expect(mockSendRequest).toHaveBeenCalled();
  });
});
