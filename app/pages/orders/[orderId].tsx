import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type PreviewData,
} from "next";
import { type ParsedUrlQuery } from "querystring";

import buildClient from "../../api/buildClient";
import OrderPayment from "../../components/Orders/OrderPayment/OrderPayment";
import { type Order } from "../../types/order";
import { type RequestWithUser } from "../../types/user";

interface Props {
  order: Order;
  currentUser: { id: string; email: string };
}

const OrderView = ({ order, currentUser }: Props) => {
  if (order.status === "complete") {
    return <div>Order completed</div>;
  }

  return <OrderPayment currentUser={currentUser} order={order} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const { orderId } = context.query;
  const req = context.req as RequestWithUser;
  const client = buildClient(context);

  const { data: order } = await client.get(`/api/orders/${orderId}`);

  return {
    props: {
      order,
      currentUser: req.currentUser || { id: "", email: "" },
    },
  };
};

export default OrderView;
