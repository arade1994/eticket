import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";

const TicketView = ({ ticket }) => {
  const { sendRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  return (
    <div>
      <h1>{ticket.title}</h1>
      <p>Price: {ticket.price}</p>
      {errors}
      <button className="btn btn-primary" onClick={() => sendRequest()}>
        Order
      </button>
    </div>
  );
};

TicketView.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketView;
