import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import mockDb from "../../../mock/db.json";
import { type Ticket } from "../../../types/ticket";
import { type Rating, type User } from "../../../types/user";

import TicketsGrid from "./TicketsGrid";

const mockTickets = mockDb.tickets as unknown as Ticket[];
const mockRatings = mockDb.ratings as unknown as Rating[];
const mockUsers = mockDb.users as unknown as User[];

describe("<TicketsGrid />", () => {
  test("it should render tickets as expected", () => {
    const { baseElement } = render(
      <TicketsGrid
        ratings={mockRatings}
        tickets={mockTickets}
        users={mockUsers}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
