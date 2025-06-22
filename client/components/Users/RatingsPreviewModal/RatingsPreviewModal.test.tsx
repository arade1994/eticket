import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import mockDb from "../../../mock/db.json";
import { type Rating, type User } from "../../../types/user";

import RatingsPreviewModal from "./RatingsPreviewModal";

const mockRatings = mockDb.ratings as unknown as Rating[];
const mockUsers = mockDb.users as unknown as User[];

const mockOnClose = vi.fn();

describe("<RatingsPreviewModal />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(
      <RatingsPreviewModal
        isOpen={true}
        ratings={mockRatings}
        userId={mockUsers[0].id}
        users={mockUsers}
        onClose={mockOnClose}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });

  test("it should close the modal when clicked the exit button", async () => {
    render(
      <RatingsPreviewModal
        isOpen={true}
        ratings={mockRatings}
        userId={mockUsers[0].id}
        users={mockUsers}
        onClose={mockOnClose}
      />
    );

    const exitBtn = screen.getByTestId("exitBtn");
    expect(exitBtn).toBeDefined();
    await userEvent.click(exitBtn);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
