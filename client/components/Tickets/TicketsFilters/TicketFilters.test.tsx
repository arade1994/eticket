import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TicketFilters from "./TicketFilters";
import { ticketCategoriesOptions } from "../../../utils/constants";
import mockDb from "../../../mock/db.json";
import userEvent from "@testing-library/user-event";

const mockUsers = mockDb.users;
const mockSelectedUser = {
  value: "-",
  label: "Any user",
};

const mockOnChangeCategory = vi.fn();
const mockOnChangeSearchText = vi.fn();
const mockOnResetFilters = vi.fn();
const mockOnSelectUser = vi.fn();

const renderTicketFilters = (searchText: string) =>
  render(
    <TicketFilters
      category={ticketCategoriesOptions[0]}
      searchText={searchText}
      selectedUser={mockSelectedUser}
      users={mockUsers}
      onChangeCategory={mockOnChangeCategory}
      onChangeSearchText={mockOnChangeSearchText}
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
    await waitFor(() => screen.getByText("Theatre play"));
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
    await waitFor(() => screen.getByText("Ante Rade"));
    await userEvent.click(screen.getByText("Ante Rade"));
    expect(mockOnSelectUser).toHaveBeenCalled();
  });

  test("it should render reset filters button when filters are applied", async () => {
    renderTicketFilters("Test");

    const resetFiltersBtn = screen.getByText("Reset filters");
    expect(resetFiltersBtn).toBeDefined();
    await userEvent.click(resetFiltersBtn);
    expect(mockOnResetFilters).toHaveBeenCalled();
  });
});
