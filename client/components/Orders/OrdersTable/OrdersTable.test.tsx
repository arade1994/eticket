import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import OrdersTable from "./OrdersTable";
import mockDb from "../../../mock/db.json";
import { Order } from "../../../types/order";

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
