import React from "react";

import classes from "./TicketsGrid.module.scss";
import { Ticket } from "../../../types/ticket";
import { Rating, User } from "../../../types/user";
import TicketCard from "../TicketCard/TicketCard";

interface Props {
  ratings: Rating[];
  tickets: Ticket[];
  users: User[];
}

const TicketsGrid = ({ ratings, tickets, users }: Props) => {
  return (
    <div className={classes.ticketsGrid}>
      {tickets.map((ticket) => {
        const user = users.find((user) => user.id === ticket.userId);

        return (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            user={user}
            ratings={ratings}
          />
        );
      })}
    </div>
  );
};

export default TicketsGrid;
