import { memo, useCallback } from "react";
import { type Ticket } from "../types/ticket";
import { Rating, type User } from "../types/user";
import Link from "next/link";

interface Props {
  tickets: Ticket[];
  users: User[];
  ratings: Rating[];
}

const TicketList = ({ tickets, users, ratings }: Props) => {
  const getUserRating = useCallback(
    (userId: string) => {
      const userRates = ratings
        ?.filter((rating) => rating.ratedUserId === userId)
        ?.map((rating) => rating.rate);
      const ratesSum = userRates?.reduce((a, b) => a + b, 0);
      if (!ratesSum || isNaN(ratesSum)) return null;
      return (ratesSum / userRates?.length).toFixed(1);
    },
    [ratings]
  );

  return tickets.map((ticket) => {
    const user = users.find((user) => user.id === ticket.userId);
    const userRating = getUserRating(ticket.userId);
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          {user ? `${user?.firstName} ${user?.lastName}` : "-"}{" "}
          {userRating ? `(${userRating})` : ""}
        </td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });
};

export default memo(TicketList);
