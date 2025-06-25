import { describe, expect, test, vi } from "vitest";

import { render } from "@testing-library/react";

import mockDb from "../../../../../client_deprecated/mock/db.json";
import { type Ticket } from "../../../types/ticket";
import { type Rating, type User } from "../../../types/user";

import TicketsGrid from "./TicketsGrid";

const mockTickets = mockDb.tickets as unknown as Ticket[];
const mockRatings = mockDb.ratings as unknown as Rating[];
const mockUsers = mockDb.users as unknown as User[];
const mockOnPageChange = vi.fn();

describe("<TicketsGrid />", () => {
  test("it should render tickets as expected", () => {
    const { baseElement } = render(
      <TicketsGrid
        currentPage={1}
        itemsPerPage={{ value: 8, label: "8 per page" }}
        ratings={mockRatings}
        tickets={mockTickets}
        users={mockUsers}
        onPageChange={mockOnPageChange}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
