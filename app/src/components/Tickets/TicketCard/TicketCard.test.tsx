import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import mockDb from "../../../../../client_deprecated/mock/db.json";
import { type Ticket } from "../../../types/ticket";
import { type Rating, type User } from "../../../types/user";

import TicketCard from "./TicketCard";

const mockTicket = mockDb.tickets[0] as unknown as Ticket;
const mockUser = mockDb.users.find(
  (user) => user.id === mockTicket.userId
) as unknown as User;
const mockRatings = mockDb.ratings as unknown as Rating[];

describe("<TicketCard />", () => {
  test("it should match snapshot when rendered by default", () => {
    const { baseElement } = render(
      <TicketCard ratings={mockRatings} ticket={mockTicket} user={mockUser} />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
