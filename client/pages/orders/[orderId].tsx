import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useRequest } from "../../hooks/useRequest";
import Router from "next/router";
import { type NextPageContext } from "next";
import { type AxiosInstance } from "axios";
import { type Order } from "../../types/order";

interface Props {
  order: Order;
  currentUser: { id: string; email: string };
}

const OrderView = ({ order, currentUser }: Props) => {
  const [time, setTime] = useState(0);
  const { sendRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const calculateTime = () => {
      const msLeft =
        new Date(order.expiresAt).getMilliseconds() -
        new Date().getMilliseconds();
      setTime(Math.round(msLeft / 1000));
    };

    calculateTime();
    const timerId = setInterval(calculateTime, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (time < 0) return <div>Order expired</div>;

  return (
    <div>
      Time left to pay: {time} seconds {errors}
      <StripeCheckout
        token={({ id }) => sendRequest({ token: id })}
        stripeKey="pk_test_51JrojjLiD4aXIcPwSJBm4pkotUCjfyCVlsnJdc6uIBNLopH8k0nCDSVs5ISglERjFCsnbEM5yzhatKpxfS48Olxa00aBjCpYRt"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </div>
  );
};

OrderView.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const { orderId } = context.query;

  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderView;
