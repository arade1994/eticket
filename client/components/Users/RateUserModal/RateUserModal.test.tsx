import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RatingModal from "./RateUserModal";

const mockCurrentUserId = "currentUserId";
const mockSelectedUserId = "selectedUserId";

const mockOnClose = vi.fn();
const mockFetchRatings = vi.fn();
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

describe("<RatingModal />", () => {
  test("It should render rating modal as expected with all fields", () => {
    const { baseElement } = render(
      <RatingModal
        currentUserId={mockCurrentUserId}
        open={true}
        selectedUserId={mockSelectedUserId}
        onClose={mockOnClose}
        onFetchRatings={mockFetchRatings}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });

  test("it should close the modal when clicked on cancel", async () => {
    render(
      <RatingModal
        currentUserId={mockCurrentUserId}
        open={true}
        selectedUserId={mockSelectedUserId}
        onClose={mockOnClose}
        onFetchRatings={mockFetchRatings}
      />
    );

    const cancelBtn = screen.getByText("Cancel");
    expect(cancelBtn).toBeDefined();
    await userEvent.click(cancelBtn);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("it should call save method and method for fetch ratings when clicked on save rating button", async () => {
    render(
      <RatingModal
        currentUserId={mockCurrentUserId}
        open={true}
        selectedUserId={mockSelectedUserId}
        onClose={mockOnClose}
        onFetchRatings={mockFetchRatings}
      />
    );

    const saveBtn = screen.getByText("Save rating");
    expect(saveBtn).toBeDefined();
    await userEvent.click(saveBtn);
    expect(mockSendRequest).toHaveBeenCalled();
    expect(mockFetchRatings).toHaveBeenCalled();
  });
});
