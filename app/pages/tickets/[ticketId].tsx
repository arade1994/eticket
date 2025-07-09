import { useCallback, useMemo } from "react";
import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type PreviewData,
} from "next";
import Router from "next/router";
import { type ParsedUrlQuery } from "querystring";
import { toast } from "react-toastify";

import buildClient from "../../api/buildClient";
import { type Ticket } from "../../types/ticket";
import { type Rating, type RequestWithUser, type User } from "../../types/user";
import { calculateExpirationDate } from "../../utils/date";
import { getUserRating } from "../../utils/users";

const client = buildClient();

interface Props {
  ticket: Ticket;
  users: User[];
  ratings: Rating[];
  currentUser: { id: string; email: string };
}

const TicketView = ({ ticket, users, ratings, currentUser }: Props) => {
  const handleOrder = useCallback(async () => {
    try {
      const { data: order } = await client.post("/api/orders", {
        ticketId: ticket.id,
        ...(process.env.NEXT_PUBLIC_DEMO_MODE && {
          userId: currentUser.id,
          expiresAt: calculateExpirationDate(),
          status: "created",
          ticket,
        }),
      });
      toast.success("Order created!");
      Router.push("/orders/[orderId]", `/orders/${order.id}`);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }, [currentUser.id, ticket]);

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
      {!isCurrentUser && (
        <button className="btn btn-primary" onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const { ticketId } = context.query;
  const req = context.req as RequestWithUser;
  const client = buildClient(context);

  const { data: ticket } = await client.get(`/api/tickets/${ticketId}`);
  const { data: users } = await client.get("/api/users");
  const { data: ratings } = await client.get("/api/users/ratings");

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
