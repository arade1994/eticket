import { useMemo } from "react";

import { type Ticket } from "../../../types/ticket";
import { type Rating, type User } from "../../../types/user";
import TicketCard from "../TicketCard/TicketCard";
import TicketsPagination from "../TicketsPagination/TicketsPagination";

import classes from "./TicketsGrid.module.scss";

interface Props {
  ratings: Rating[];
  tickets: Ticket[];
  users: User[];
  currentPage: number;
  itemsPerPage: {
    value: number;
    label: string;
  };
  onPageChange: (page: number) => void;
}

const TicketsGrid = ({
  ratings,
  tickets,
  users,
  currentPage,
  itemsPerPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(tickets.length / itemsPerPage.value);

  const paginatedTickets = useMemo(
    () =>
      tickets.slice(
        (currentPage - 1) * itemsPerPage.value,
        currentPage * itemsPerPage.value
      ),
    [currentPage, tickets, itemsPerPage.value]
  );

  return (
    <div className={classes.ticketsContainer}>
      <div className={classes.ticketsGrid}>
        {paginatedTickets.map((ticket) => {
          const user = users.find((user) => user.id === ticket.userId);
          return (
            <TicketCard
              key={ticket.id}
              ratings={ratings}
              ticket={ticket}
              user={user}
            />
          );
        })}
      </div>
      {totalPages > 1 && (
        <TicketsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default TicketsGrid;
