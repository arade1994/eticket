import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import UsersFilters from "./UsersFilters";
import userEvent from "@testing-library/user-event";

const mockOnChangeSearchText = vi.fn();
const mockOnResetFilters = vi.fn();

const renderUsersFilters = (searchText: string) =>
  render(
    <UsersFilters
      searchText={searchText}
      onChangeSearchText={mockOnChangeSearchText}
      onResetFilters={mockOnResetFilters}
    />
  );

describe("<UsersFilters />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = renderUsersFilters("");

    expect(baseElement).toMatchSnapshot();
  });

  test("it should render search filter", async () => {
    renderUsersFilters("");

    const searchInput = screen.getByTestId("search");
    expect(searchInput).toBeDefined();
    await userEvent.type(searchInput, "Test");
    expect(mockOnChangeSearchText).toHaveBeenCalled();
  });

  test("it should render reset filters button when filters are applied", async () => {
    renderUsersFilters("Test");

    const resetFiltersBtn = screen.getByText("Reset filters");
    await userEvent.click(resetFiltersBtn);
    expect(mockOnResetFilters).toHaveBeenCalled();
  });
});
