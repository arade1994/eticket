import { memo } from "react";
import { type Ticket } from "../types/ticket";
import { type User } from "../types/user";
import Link from "next/link";

interface Props {
  tickets: Ticket[];
  users: User[];
}

const TicketList = ({ tickets, users }: Props) => {
  return tickets.map((ticket) => {
    const user = users.find((user) => user.id === ticket.userId);
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
        <td>{user ? `${user?.firstName}${user?.lastName}` : "-"}</td>
      </tr>
    );
  });
};

export default memo(TicketList);
