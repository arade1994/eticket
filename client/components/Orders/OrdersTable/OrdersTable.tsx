import { useCallback } from "react";
import Link from "next/link";

import { type Order } from "../../../types/order";
import { type User } from "../../../types/user";
import { formatDateToHHMM } from "../../../utils/date";

import classes from "./OrdersTable.module.scss";

const headerLabels = [
  "Ticket title",
  "Price($)",
  "User",
  "Status",
  "Expires at",
  "Actions",
];

interface Props {
  orders: Order[];
  users: User[];
}

const OrdersTable: React.FC<React.PropsWithChildren<Props>> = ({
  orders,
  users,
}) => {
  const getUserFullName = useCallback(
    (userId: string) => {
      const user = users?.find((user) => user.id === userId);

      return `${user?.firstName} ${user?.lastName}`;
    },
    [users]
  );

  return (
    <table className={classes.ordersTable}>
      <thead className={classes.ordersTableHeader}>
        {headerLabels.map((label) => (
          <th key={label} className={classes.headerData}>
            {label}
          </th>
        ))}
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className={classes.ordersTableRow}>
            <td className={classes.tableItem}>{order?.ticket?.title}</td>
            <td className={classes.tableItem}>{order?.ticket?.price}</td>
            <td className={classes.tableItem}>
              {getUserFullName(order?.userId)}
            </td>
            <td className={classes.tableItem}>{order?.status}</td>
            <td className={classes.tableItem}>
              {formatDateToHHMM(order?.expiresAt)}
            </td>
            <td className={classes.tableItem}>
              <Link
                className={classes.openOrderLink}
                href={`/orders/${order.id}`}
              >
                Open
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
