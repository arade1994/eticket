import { describe, expect, test, vi } from "vitest";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import mockDb from "../../../../../client_deprecated/mock/db.json";
import { ticketCategoriesOptions } from "../../../../../client_deprecated/utils/constants";

import TicketFilters from "./TicketFilters";

const mockUsers = mockDb.users;
const mockSelectedUser = {
  value: "-",
  label: "Any user",
};

const mockOnChangeCategory = vi.fn();
const mockOnChangeSearchText = vi.fn();
const mockOnResetFilters = vi.fn();
const mockOnSelectUser = vi.fn();
const mockOnItemsPerPageChange = vi.fn();

const renderTicketFilters = (searchText: string) =>
  render(
    <TicketFilters
      category={ticketCategoriesOptions[0]}
      itemsPerPage={{ value: 8, label: "8 per page" }} // TODO: Add unit tests for this filter
      searchText={searchText}
      selectedUser={mockSelectedUser}
      users={mockUsers}
      onChangeCategory={mockOnChangeCategory}
      onChangeSearchText={mockOnChangeSearchText}
      onItemsPerPageChange={mockOnItemsPerPageChange}
      onResetFilters={mockOnResetFilters}
      onSelectUser={mockOnSelectUser}
    />
  );

describe("<TicketFilters />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = renderTicketFilters("");

    expect(baseElement).toMatchSnapshot();
  });

  test("it should render title filter", async () => {
    renderTicketFilters("");

    const titleInput = screen.getByTestId("title") as HTMLInputElement;
    expect(titleInput).toBeDefined();
    await userEvent.type(titleInput, "Test");
    expect(mockOnChangeSearchText).toHaveBeenCalled();
  });

  test("it should render category select", async () => {
    renderTicketFilters("");

    const categorySelect = within(
      screen.getByTestId("categorySelect")
    ).getByText("Sport game");
    expect(categorySelect).toBeDefined();
    expect(categorySelect.textContent).toEqual("Sport game");
    await userEvent.click(categorySelect);
    await screen.findByText("Theatre play");
    await userEvent.click(screen.getByText("Theatre play"));
    expect(mockOnChangeCategory).toHaveBeenCalled();
  });

  test("it should render user select", async () => {
    renderTicketFilters("");

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

  test("it should render items per page select", async () => {
    renderTicketFilters("");

    const itemsPerPageSelect = within(
      screen.getByTestId("itemsPerPageSelect")
    ).getByText("8 per page");
    expect(itemsPerPageSelect).toBeDefined();
    expect(itemsPerPageSelect.textContent).toEqual("8 per page");
    await userEvent.click(itemsPerPageSelect);
    await screen.findByText("24 per page");
    await userEvent.click(screen.getByText("24 per page"));
    expect(mockOnItemsPerPageChange).toHaveBeenCalled();
  });

  test("it should render reset filters button when filters are applied", async () => {
    renderTicketFilters("Test");

    const resetFiltersBtn = screen.getByText("Reset filters");
    expect(resetFiltersBtn).toBeDefined();
    await userEvent.click(resetFiltersBtn);
    expect(mockOnResetFilters).toHaveBeenCalled();
  });
});
