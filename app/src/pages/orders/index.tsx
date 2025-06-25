import axios from "axios";
import { type ParsedUrlQuery } from "querystring";

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
  const isDemoMode = !!process.env.REACT_PUBLIC_DEMO_MODE;

  const baseURL = !isDemoMode
    ? process.env.REACT_PUBLIC_API_URL || "http://localhost:3000/api"
    : "http://localhost:3000";

  const client = axios.create({
    baseURL,
    headers: context.req.headers,
  });

  const { data: orders } = await client.get("/orders");
  const { data: users } = await client.get("/users");

  return {
    props: {
      orders,
      users,
    },
  };
};

export default OrderList;
