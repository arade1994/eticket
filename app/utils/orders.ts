import { type Order } from "../types/order";

/**
 * Filters orders by ticket title, status and user that created the order
 * @param orders - list of orders
 * @param searchText - ticket title
 * @param userId - id of user that created the order
 * @param status - selected order status
 * @returns filtered list of orders
 */
export const filterOrders = (
  orders: Order[],
  searchText: string,
  userId: string,
  status: string
) => {
  let filteredOrders = [...orders];

  if (searchText.trim() !== "")
    filteredOrders = filteredOrders.filter((order) =>
      order.ticket.title.toLowerCase().includes(searchText.toLowerCase())
    );

  if (userId !== "-")
    filteredOrders = filteredOrders.filter((order) => order.userId === userId);

  if (status !== "-")
    filteredOrders = filteredOrders.filter((order) => order.status === status);

  return filteredOrders;
};
