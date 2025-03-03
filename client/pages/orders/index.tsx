import { type NextPageContext } from "next";
import { type AxiosInstance } from "axios";

import OrdersLayout from "../../layouts/OrdersLayout/OrdersLayout";
import { type Order } from "../../types/order";
import { type User } from "../../types/user";

interface Props {
  orders: Order[];
  users: User[];
}

const OrderList = ({ orders, users }: Props) => {
  return <OrdersLayout orders={orders} users={users} />;
};

OrderList.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const isDemoMode = !!process.env.NEXT_PUBLIC_DEMO_MODE;

  const { data: orders } = await client.get(
    !isDemoMode ? "/api/orders" : "/orders"
  );

  const { data: users } = await client.get(
    !isDemoMode ? "/api/users" : "/users"
  );

  return { orders, users };
};

export default OrderList;
