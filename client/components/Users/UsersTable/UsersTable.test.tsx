import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import mockDb from "../../../mock/db.json";
import { type Ticket } from "../../../types/ticket";
import { type Rating, type User } from "../../../types/user";

import UsersTable from "./UsersTable";

const mockUsers = mockDb.users as unknown as User[];
const mockRatings = mockDb.ratings as unknown as Rating[];
const mockTickets = mockDb.tickets as unknown as Ticket[];
const mockCurrentUser = mockUsers[3] as unknown as {
  id: string;
  email: string;
};

const mockOnOpenRatingModal = vi.fn();
const mockOnOpenRatingsModalList = vi.fn();
const mockOnSelectUser = vi.fn();

const renderUsersTable = () =>
  render(
    <UsersTable
      currentUser={mockCurrentUser}
      ratings={mockRatings}
      tickets={mockTickets}
      users={mockUsers}
      onOpenRatingModal={mockOnOpenRatingModal}
      onOpenRatingsModalList={mockOnOpenRatingsModalList}
      onSelectUser={mockOnSelectUser}
    />
  );

describe("<UsersTable />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = renderUsersTable();

    expect(baseElement).toMatchSnapshot();
  });

  test("it should open ratings modal list when view action is clicked", async () => {
    renderUsersTable();

    const viewAction = screen.getAllByText("View")[0];
    expect(viewAction).toBeDefined();
    await userEvent.click(viewAction);
    expect(mockOnSelectUser).toHaveBeenCalled();
    expect(mockOnOpenRatingsModalList).toHaveBeenCalled();
  });

  test("it should open rating modal when rate action is clicked", async () => {
    renderUsersTable();

    const rateAction = screen.getAllByText("Rate")[1];
    expect(rateAction).toBeDefined();
    await userEvent.click(rateAction);
    expect(mockOnOpenRatingModal).toHaveBeenCalled();
  });
});
