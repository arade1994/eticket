import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useRequest } from "../../hooks/useRequest";
import Router from "next/router";

const OrderView = ({ order, currentUser }) => {
  const [time, setTime] = useState(0);
  const { sendRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => Router.push("/orders"),
  });

  useEffect(() => {
    const calculateTime = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
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

OrderView.getInitialProps = async (context, client) => {
  const { orderId } = context.query;

  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderView;
