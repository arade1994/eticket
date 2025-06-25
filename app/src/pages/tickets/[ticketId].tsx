import { useMemo } from "react";

import axios from "axios";
import { type ParsedUrlQuery } from "querystring";
import { toast } from "react-toastify";

import { useRequest } from "../../hooks/useRequest";
import { type Order } from "../../types/order";
import { type Ticket } from "../../types/ticket";
import { type Rating, type RequestWithUser, type User } from "../../types/user";
import { calculateExpirationDate } from "../../../../client_deprecated/utils/date";
import { getUserRating } from "../../../../client_deprecated/utils/users";

interface Props {
  ticket: Ticket;
  users: User[];
  ratings: Rating[];
  currentUser: { id: string; email: string };
}

const TicketView = ({ ticket, users, ratings, currentUser }: Props) => {
  const { sendRequest, errors } = useRequest({
    url: !process.env.REACT_PUBLIC_DEMO_MODE
      ? "/api/orders"
      : "http://localhost:3000/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
      ...(process.env.REACT_PUBLIC_DEMO_MODE && {
        userId: currentUser.id,
        expiresAt: calculateExpirationDate(),
        status: "created",
        ticket,
      }),
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const isDemoMode = !!process.env.REACT_PUBLIC_DEMO_MODE;
  const { ticketId } = context.query;
  const req = context.req as RequestWithUser;

  const baseURL = !isDemoMode
    ? process.env.REACT_PUBLIC_API_URL || "http://localhost:3000/api"
    : "http://localhost:3000";

  const client = axios.create({
    baseURL,
    headers: context.req.headers,
  });

  const { data: ticket } = await client.get(`/tickets/${ticketId}`);
  const { data: users } = await client.get("/users");
  const { data: ratings } = await client.get("/ratings");

  return {
    props: {
      ticket,
      users,
      ratings,
      currentUser: req.currentUser || { id: "", email: "" },
    },
  };
};

export default TicketView;
