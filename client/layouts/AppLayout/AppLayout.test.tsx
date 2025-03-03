import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import mockDb from "../../mock/db.json";
import { type Ticket } from "../../types/ticket";
import { type Rating, type User } from "../../types/user";

import AppLayout from "./AppLayout";

const mockRatings = mockDb.ratings as unknown as Rating[];
const mockUsers = mockDb.users as unknown as User[];
const mockTickets = mockDb.tickets as unknown as Ticket[];
const MockComponent: React.FC = () => <div>Component</div>;

describe("<AppLayout />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(
      <AppLayout
        Component={MockComponent}
        currentUser={mockUsers[1]}
        pageProps={{
          tickets: mockTickets,
          users: mockUsers,
          ratings: mockRatings,
        }}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
