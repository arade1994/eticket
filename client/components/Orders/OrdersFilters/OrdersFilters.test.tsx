import { describe, expect, test, vi } from "vitest";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import OrdersFilters from "./OrdersFilters";

const mockSelectedUser = { value: "-", label: "Any user" };
const mockSelectedStatus = { value: "-", label: "Any status" };
const mockUserOptions = [
  { value: "34udjgi", label: "Ante Rade" },
  { value: "u2hdu4", label: "Text User" },
];
const mockOnChangeSearchText = vi.fn();
const mockOnResetFilters = vi.fn();
const mockOnSelectStatus = vi.fn();
const mockOnSelectUser = vi.fn();

const renderOrdersFilters = (searchText: string) =>
  render(
    <OrdersFilters
      searchText={searchText}
      selectedStatus={mockSelectedStatus}
      selectedUser={mockSelectedUser}
      userOptions={mockUserOptions}
      onChangeSearchText={mockOnChangeSearchText}
      onResetFilters={mockOnResetFilters}
      onSelectStatus={mockOnSelectStatus}
      onSelectUser={mockOnSelectUser}
    />
  );

describe("<OrdersFilters />", () => {
  test("it should contain all the necessary filters for ticket orders table", async () => {
    const { baseElement } = renderOrdersFilters("");

    expect(baseElement).toMatchSnapshot();
  });

  test("it should render a search filter", async () => {
    renderOrdersFilters("");

    const searchInput = screen.getByTestId("searchInput") as Element;
    expect(searchInput).toBeDefined();
    await userEvent.type(searchInput, "Test");
    expect(mockOnChangeSearchText).toHaveBeenCalled();
  });

  test("it should render a users filter", async () => {
    renderOrdersFilters("");

    const userSelect = within(screen.getByTestId("userSelect")).getByText(
      "Any user"
    );
    expect(userSelect).toBeDefined();
    expect(userSelect.textContent).toEqual("Any user");
    await userEvent.click(userSelect);
    await screen.findByText("Ante Rade");
    await userEvent.click(screen.getByText("Ante Rade"));
    expect(mockOnSelectUser).toHaveBeenCalled();
  });

  test("it should render a status filter", async () => {
    renderOrdersFilters("");

    const statusSelect = within(screen.getByTestId("statusSelect")).getByText(
      "Any status"
    );
    expect(statusSelect).toBeDefined();
    expect(statusSelect.textContent).toEqual("Any status");
    await userEvent.click(statusSelect);
    await screen.findByText("Created");
    await userEvent.click(screen.getByText("Created"));
    expect(mockOnSelectStatus).toHaveBeenCalled();
  });

  test("it should render a button to reset filters when filters are applied", async () => {
    renderOrdersFilters("Test");

    const resetFiltersBtn = screen.getByText("Reset filters");
    expect(resetFiltersBtn).toBeDefined();
    await userEvent.click(resetFiltersBtn);
    expect(mockOnResetFilters).toHaveBeenCalled();
  });
});
