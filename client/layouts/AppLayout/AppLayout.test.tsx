import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AppLayout from "./AppLayout";
import mockDb from "../../mock/db.json";
import { Rating, User } from "../../types/user";
import { Ticket } from "../../types/ticket";

const mockRatings = mockDb.ratings as unknown as Rating[];
const mockUsers = mockDb.users as unknown as User[];
const mockTickets = mockDb.tickets as unknown as Ticket[];
const MockComponent: React.FC = () => <div>Component</div>;

describe("<AppLayout />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(
      <AppLayout
        Component={MockComponent}
        pageProps={{
          tickets: mockTickets,
          users: mockUsers,
          ratings: mockRatings,
        }}
        currentUser={mockUsers[1]}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
