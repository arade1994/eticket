import { type NextPageContext } from "next";
import { type Order } from "../../types/order";
import { type AxiosInstance } from "axios";

interface Props {
  orders: Order[];
}

const OrderList = ({ orders }: Props) => {
  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.ticket.title} - {order.status}
        </li>
      ))}
    </ul>
  );
};

OrderList.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderList;
