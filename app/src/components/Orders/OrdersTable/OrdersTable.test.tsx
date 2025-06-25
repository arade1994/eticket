import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import mockDb from "../../../../../client_deprecated/mock/db.json";
import { type Order } from "../../../types/order";

import OrdersTable from "./OrdersTable";

const mockOrders = mockDb.orders.splice(0, 2);
const mockUsers = mockDb.users;

describe("<OrdersTable />", () => {
  test("it should render selected orders inside a table", () => {
    const { baseElement } = render(
      <OrdersTable
        orders={mockOrders as unknown as Order[]}
        users={mockUsers}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
