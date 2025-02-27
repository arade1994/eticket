import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TicketsGrid from "./TicketsGrid";
import mockDb from "../../../mock/db.json";
import { Ticket } from "../../../types/ticket";
import { Rating, User } from "../../../types/user";

const mockTickets = mockDb.tickets as unknown as Ticket[];
const mockRatings = mockDb.ratings as unknown as Rating[];
const mockUsers = mockDb.users as unknown as User[];

describe("<TicketsGrid />", () => {
  test("it should render tickets as expected", () => {
    const { baseElement } = render(
      <TicketsGrid
        ratings={mockRatings}
        users={mockUsers}
        tickets={mockTickets}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
