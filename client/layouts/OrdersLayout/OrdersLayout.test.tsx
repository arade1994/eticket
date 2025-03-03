import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import OrdersLayout from "./OrdersLayout";
import mockDb from "../../mock/db.json";
import { Order } from "../../types/order";
import { User } from "../../types/user";

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
