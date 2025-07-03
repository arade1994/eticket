import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TicketsPagination from "./TicketsPagination";

const mockOnPageChange = vi.fn();

describe("<TicketsPagination />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(
      <TicketsPagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });

  test("it should display buttons for navigating through pages", async () => {
    render(
      <TicketsPagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const btnLeft = screen.getByTestId("paginate-left");
    expect(btnLeft).toBeDefined();
    await userEvent.click(btnLeft);
    expect(mockOnPageChange).toHaveBeenCalled();

    const btnRight = screen.getByTestId("paginate-right");
    expect(btnRight).toBeDefined();
    await userEvent.click(btnRight);
    expect(mockOnPageChange).toHaveBeenCalled();
  });

  test("it should display page numbers to select specific pages", async () => {
    render(
      <TicketsPagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const pageNumBtn = screen.getByTestId("page-4");
    expect(pageNumBtn).toBeDefined();
    await userEvent.click(pageNumBtn);
    expect(mockOnPageChange).toHaveBeenCalled();
  });
});
