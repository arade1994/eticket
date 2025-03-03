import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TicketCard from "./TicketCard";
import mockDb from "../../../mock/db.json";
import { Ticket } from "../../../types/ticket";
import { Rating, User } from "../../../types/user";

const mockTicket = mockDb.tickets[0] as unknown as Ticket;
const mockUser = mockDb.users.find(
  (user) => user.id === mockTicket.userId
) as unknown as User;
const mockRatings = mockDb.ratings as unknown as Rating[];

describe("<TicketCard />", () => {
  test("it should match snapshot when rendered by default", () => {
    const { baseElement } = render(
      <TicketCard ticket={mockTicket} user={mockUser} ratings={mockRatings} />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
