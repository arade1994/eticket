import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import { type Ticket } from "../../types/ticket";
import { type Order } from "../../types/order";
import { type NextPageContext } from "next";
import { type AxiosInstance } from "axios";

interface Props {
  ticket: Ticket;
}

const TicketView = ({ ticket }: Props) => {
  const { sendRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order: Order) =>
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

TicketView.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const { ticketId } = context.query;

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketView;
