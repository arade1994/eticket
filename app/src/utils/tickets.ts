import { type Ticket } from "../../app/src/types/ticket";

/**
 * Filters tickets by title, category and user that created the ticket
 * @param tickets - list of tickets
 * @param searchText - ticket title
 * @param category - ticket predefined category
 * @param userId - id of user that created the ticket
 * @returns - filtered list of tickets
 */
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
