import { Ticket } from "../types/ticket";
import { User } from "../types/user";

export const getNumOfCreatedTickets = (user: User, tickets: Ticket[]) =>
  tickets?.filter((ticket) => ticket.userId === user.id)?.length;
