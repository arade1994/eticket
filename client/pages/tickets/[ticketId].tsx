import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import { type Ticket } from "../../types/ticket";
import { type Order } from "../../types/order";
import { type NextPageContext } from "next";
import { type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { type Rating, type User } from "../../types/user";
import { useMemo } from "react";
import { getUserRating } from "../../utils/user";

interface Props {
  ticket: Ticket;
  users: User[];
  ratings: Rating[];
  currentUser: { id: string; email: string };
}

const TicketView = ({ ticket, users, ratings, currentUser }: Props) => {
  const { sendRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order: Order) => {
      toast.success("Order created!");
      Router.push("/orders/[orderId]", `/orders/${order.id}`);
    },
  });

  const user = useMemo(
    () => users?.find((user) => user.id === ticket.userId),
    [users, ticket]
  );

  const isCurrentUser = user?.id === currentUser.id;
  console.log(isCurrentUser);

  return (
    <div>
      <h1>{ticket.title}</h1>
      <p>Price: {ticket.price}$</p>
      {user && (
        <p>
          Created By:{" "}
          {`${user?.firstName} ${user?.lastName} (${getUserRating(
            user.id,
            ratings
          )})`}
        </p>
      )}
      <p>Category: {ticket.category}</p>
      {errors}
      {!isCurrentUser && (
        <button className="btn btn-primary" onClick={() => sendRequest()}>
          Order
        </button>
      )}
    </div>
  );
};

TicketView.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const { ticketId } = context.query;

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  const { data: users } = await client.get("/api/users");

  const { data: ratings } = await client.get("/api/users/ratings");

  return { ticket: data, users, ratings };
};

export default TicketView;
