import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import mockDb from "../../../../client_deprecated/mock/db.json";
import { type Order } from "../../types/order";
import { type User } from "../../types/user";

import OrdersLayout from "./OrdersLayout";

const mockOrders = mockDb.orders as unknown as Order[];
const mockUsers = mockDb.users as unknown as User[];

describe("<OrdersLayout />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(
      <OrdersLayout orders={mockOrders} users={mockUsers} />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
