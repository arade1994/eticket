import { Ticket } from "../types/ticket";

export const filterTickets = (
  tickets: Ticket[],
  searchText: string,
  category: string,
  userId: string
) => {
  let filteredTickets = [...tickets];

  if (searchText.trim() !== "")
    filteredTickets = filteredTickets.filter((ticket) =>
      ticket.title.toLowerCase().includes(searchText.toLowerCase())
    );

  if (category !== "-")
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.category === category
    );

  if (userId !== "-")
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.userId === userId
    );

  return filteredTickets;
};
