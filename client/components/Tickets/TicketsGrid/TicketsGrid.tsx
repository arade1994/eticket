import React from "react";

import { type Ticket } from "../../../types/ticket";
import { type Rating, type User } from "../../../types/user";
import TicketCard from "../TicketCard/TicketCard";

import classes from "./TicketsGrid.module.scss";

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
            ratings={ratings}
            ticket={ticket}
            user={user}
          />
        );
      })}
    </div>
  );
};

export default TicketsGrid;
