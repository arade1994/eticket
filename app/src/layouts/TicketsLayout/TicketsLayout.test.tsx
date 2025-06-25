import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import mockDb from "../../../../client_deprecated/mock/db.json";
import { type Ticket } from "../../types/ticket";
import { type Rating, type User } from "../../types/user";

import TicketsLayout from "./TicketsLayout";

const mockTickets = mockDb.tickets as unknown as Ticket[];
const mockUsers = mockDb.users as unknown as User[];
const mockRatings = mockDb.ratings as unknown as Rating[];

describe("<TicketsLayout />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(
      <TicketsLayout
        ratings={mockRatings}
        tickets={mockTickets}
        users={mockUsers}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
