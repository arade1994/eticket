import { ChangeEvent, useCallback, useMemo, useState } from "react";
import OrdersFilters from "../../components/Orders/OrdersFilters/OrdersFilters";
import { SingleValue } from "react-select";
import { filterOrders } from "../../utils/orders";
import { Order } from "../../types/order";
import { User } from "../../types/user";
import classes from "./OrdersLayout.module.scss";
import OrdersTable from "../../components/Orders/OrdersTable/OrdersTable";

interface Props {
  orders: Order[];
  users: User[];
}

const OrdersLayout: React.FC<React.PropsWithChildren<Props>> = ({
  orders,
  users,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    value: "-",
    label: "Any user",
  });
  const [selectedStatus, setSelectedStatus] = useState({
    value: "-",
    label: "Any status",
  });

  const handleChangeSearchText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value),
    []
  );

  const handleSelectUser = useCallback(
    (
      option: SingleValue<{
        value: string;
        label: string;
      }>
    ) =>
      setSelectedUser({
        value: option?.value ?? "-",
        label: option?.label ?? "Any user",
      }),
    []
  );

  const handleSelectStatus = useCallback(
    (
      option: SingleValue<{
        value: string;
        label: string;
      }>
    ) =>
      setSelectedStatus({
        value: option?.value ?? "-",
        label: option?.label ?? "Any status",
      }),
    []
  );

  const handleResetFilters = useCallback(() => {
    setSearchText("");
    setSelectedUser({ value: "-", label: "Any user" });
    setSelectedStatus({ value: "-", label: "Any status" });
  }, []);

  const filteredOrders = useMemo(
    () =>
      filterOrders(
        orders,
        searchText,
        selectedUser.value,
        selectedStatus.value
      ),
    [orders, searchText, selectedUser.value, selectedStatus.value]
  );

  const userOptions = useMemo(
    () =>
      users.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
      })),
    [users]
  );

  return (
    <div className={classes.ordersContent}>
      <OrdersFilters
        searchText={searchText}
        selectedUser={selectedUser}
        selectedStatus={selectedStatus}
        userOptions={userOptions}
        onChangeSearchText={handleChangeSearchText}
        onSelectUser={handleSelectUser}
        onSelectStatus={handleSelectStatus}
        onResetFilters={handleResetFilters}
      />
      {filteredOrders.length ? (
        <OrdersTable users={users} orders={orders} />
      ) : (
        <h1>No orders yet! Please go to tickets page and order one.</h1>
      )}
    </div>
  );
};

export default OrdersLayout;
