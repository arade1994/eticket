import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import UsersLayout from "./UsersLayout";
import mockDb from "../../mock/db.json";
import { User } from "../../types/user";
import { Ticket } from "../../types/ticket";

const mockUsers = mockDb.users as unknown as User[];
const mockTickets = mockDb.tickets as unknown as Ticket[];
const mockCurrentUser = { id: mockUsers[0].id, email: mockUsers[0].email };

vi.mock("../../hooks/useRequest", async () => {
  const actualModule = await vi.importActual("../../hooks/useRequest");

  return {
    ...actualModule,
    useRequest: vi.fn().mockImplementation(() => ({
      sendRequest: vi.fn(),
      errors: [],
    })),
  };
});

describe("<UsersLayout />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(
      <UsersLayout
        users={mockUsers}
        tickets={mockTickets}
        currentUser={mockCurrentUser}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
