import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type PreviewData,
} from "next";
import { type ParsedUrlQuery } from "querystring";

import buildClient from "../../api/buildClient";
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const client = buildClient(context);

  const { data: orders } = await client.get("/api/orders");
  const { data: users } = await client.get("/api/users");

  return {
    props: {
      orders,
      users,
    },
  };
};

export default OrderList;
