import { describe, expect, test, vi } from "vitest";

import { render } from "@testing-library/react";

import mockDb from "../../../../client_deprecated/mock/db.json";
import { type Ticket } from "../../types/ticket";
import { type User } from "../../types/user";

import UsersLayout from "./UsersLayout";

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
        currentUser={mockCurrentUser}
        tickets={mockTickets}
        users={mockUsers}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
