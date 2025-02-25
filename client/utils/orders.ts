import { Order } from "../types/order";

export const filterOrders = (
  orders: Order[],
  searchText: string,
  userId: string,
  status: string
) => {
  let filteredOrders = [...orders];

  if (searchText.trim() !== "")
    filteredOrders = filteredOrders.filter((order) =>
      order.ticket.title.toLowerCase().includes(searchText)
    );

  if (userId !== "-")
    filteredOrders = filteredOrders.filter((order) => order.userId === userId);

  if (status !== "-")
    filteredOrders = filteredOrders.filter((order) => order.status === status);

  return filteredOrders;
};
