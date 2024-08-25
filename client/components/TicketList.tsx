import { memo } from "react";
import { type Ticket } from "../types/ticket";
import { Rating, type User } from "../types/user";
import Link from "next/link";
import { getUserRating } from "../utils/user";

interface Props {
  tickets: Ticket[];
  users: User[];
  ratings: Rating[];
}

const TicketList = ({ tickets, users, ratings }: Props) => {
  return tickets.map((ticket) => {
    const user = users.find((user) => user.id === ticket.userId);
    const userRating = getUserRating(ticket.userId, ratings);

    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          {user ? `${user?.firstName} ${user?.lastName}` : "-"}{" "}
          {userRating ? `(${userRating})` : ""}
        </td>
        <td>{ticket.category}</td>
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
