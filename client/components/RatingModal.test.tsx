import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import RatingModal from "./RatingModal";

const mockCurrentUserId = "currentUserId";
const mockSelectedUserId = "selectedUserId";

const mockOnClose = vi.fn();
const mockFetchRatings = vi.fn();

describe("<RatingModal />", () => {
  test("It should render rating modal as expected with all fields", () => {
    const { baseElement } = render(
      <RatingModal
        open={true}
        currentUserId={mockCurrentUserId}
        selectedUserId={mockSelectedUserId}
        handleCloseClick={mockOnClose}
        fetchRatings={mockFetchRatings}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
