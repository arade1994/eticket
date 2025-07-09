import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type PreviewData,
} from "next";
import Router from "next/router";
import dayjs from "dayjs";
import { type ParsedUrlQuery } from "querystring";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

import buildClient from "../../api/buildClient";
import { type Order } from "../../types/order";
import { type RequestWithUser } from "../../types/user";

const client = buildClient();

interface Props {
  order: Order;
  currentUser: { id: string; email: string };
}

const OrderView = ({ order, currentUser }: Props) => {
  const [time, setTime] = useState(0);

  const handlePayment = useCallback(
    async (token: string) => {
      try {
        await client.post("/api/payments", {
          orderId: order.id,
          token,
        });
        toast.success("Payment successfull!");
        Router.push("/orders");
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
    [order]
  );

  useEffect(() => {
    const calculateTime = () => {
      const msLeft = dayjs(order.expiresAt).diff(dayjs(), "ms");
      setTime(Math.round(msLeft / 1000));
    };

    calculateTime();
    const timerId = setInterval(calculateTime, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  const expiresAt = useMemo(() => {
    const base = dayjs().startOf("day");
    const result = base.add(time, "second");
    return result.format("mm:ss");
  }, [time]);

  if (time < 0) return <div>Order expired</div>;

  return (
    <div>
      Time left to pay: {expiresAt}
      <StripeCheckout
        amount={order?.ticket?.price * 100}
        email={currentUser.email}
        stripeKey="pk_test_51JrojjLiD4aXIcPwSJBm4pkotUCjfyCVlsnJdc6uIBNLopH8k0nCDSVs5ISglERjFCsnbEM5yzhatKpxfS48Olxa00aBjCpYRt"
        token={({ id }) => handlePayment(id)}
      />
    </div>
  );
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
