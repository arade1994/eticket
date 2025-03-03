import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TicketsLayout from "./TicketsLayout";
import mockDb from "../../mock/db.json";
import { Ticket } from "../../types/ticket";
import { Rating, User } from "../../types/user";

const mockTickets = mockDb.tickets as unknown as Ticket[];
const mockUsers = mockDb.users as unknown as User[];
const mockRatings = mockDb.ratings as unknown as Rating[];

describe("<TicketsLayout />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(
      <TicketsLayout
        tickets={mockTickets}
        users={mockUsers}
        ratings={mockRatings}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
