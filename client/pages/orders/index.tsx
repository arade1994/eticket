import { type NextPageContext } from "next";
import { type Order } from "../../types/order";
import { type AxiosInstance } from "axios";
import { type User } from "../../types/user";
import { useCallback } from "react";

interface Props {
  orders: Order[];
  users: User[];
}

const OrderList = ({ orders, users }: Props) => {
  const getUserFullName = useCallback(
    (userId: string) => {
      const user = users?.find((user) => user.id === userId);

      return `${user?.firstName} ${user?.lastName}`;
    },
    [users]
  );

  const getExpiresTimeFormat = useCallback((date: string) => {
    const dateObject = new Date(date);

    return `${dateObject.getHours()}:${dateObject.getMinutes()}`;
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Ticket title</th>
          <th>Price($)</th>
          <th>User</th>
          <th>Status</th>
          <th>Expires at</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.ticket.title}</td>
            <td>{order.ticket.price}</td>
            <td>{getUserFullName(order.userId)}</td>
            <td>{order.status}</td>
            <td>{getExpiresTimeFormat(order.expiresAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

OrderList.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const { data: orders } = await client.get("/api/orders");

  const { data: users } = await client.get("/api/users");

  return { orders, users };
};

export default OrderList;
