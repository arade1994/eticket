import { type NextPageContext } from "next";
import { type Order } from "../../types/order";
import { type AxiosInstance } from "axios";
import { type User } from "../../types/user";
import { useCallback, useMemo, useState } from "react";
import Select from "react-select";

interface Props {
  orders: Order[];
  users: User[];
}

const statusOptions = [
  { value: "-", label: "Any status" },
  { value: "created", label: "Created" },
  { value: "cancelled", label: "Cancelled" },
  { value: "awaiting:payment", label: "Awaiting payment" },
  { value: "complete", label: "Complete" },
];

const OrderList = ({ orders, users }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    value: "-",
    label: "Any user",
  });
  const [selectedStatus, setSelectedStatus] = useState({
    value: "-",
    label: "Any status",
  });

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

  const resetAllFilters = useCallback(() => {
    setSearchText("");
    setSelectedUser({ value: "-", label: "Any user" });
    setSelectedStatus({ value: "-", label: "Any status" });
  }, []);

  const filteredOrders = useMemo(() => {
    let filteredOrders = [...orders];

    if (searchText.trim() !== "")
      filteredOrders = filteredOrders.filter((order) =>
        order.ticket.title.toLowerCase().includes(searchText)
      );

    if (selectedUser.value !== "-")
      filteredOrders = filteredOrders.filter(
        (order) => order.userId === selectedUser.value
      );

    if (selectedStatus.value !== "-")
      filteredOrders = filteredOrders.filter(
        (order) => order.status === selectedStatus.value
      );

    return filteredOrders;
  }, [orders, searchText, selectedUser.value, selectedStatus.value]);

  const userOptions = useMemo(
    () =>
      users.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
      })),
    [users]
  );

  const areFiltersApplied =
    searchText.trim() !== "" ||
    selectedUser.value !== "-" ||
    selectedStatus.value !== "-";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        marginTop: "50px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        <input
          type="text"
          placeholder="Insert title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          value={selectedUser}
          onChange={(option) => setSelectedUser(option)}
          options={[{ value: "-", label: "Any user" }, ...userOptions]}
        />
        <Select
          value={selectedStatus}
          onChange={(option) => setSelectedStatus(option)}
          options={statusOptions}
        />
        {areFiltersApplied && (
          <div
            style={{ cursor: "pointer", alignSelf: "center" }}
            onClick={resetAllFilters}
          >
            Reset filters
          </div>
        )}
      </div>
      {filteredOrders.length ? (
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
            {filteredOrders.map((order) => (
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
      ) : (
        <h1>No orders yet! Please go to tickets page and start an order.</h1>
      )}
    </div>
  );
};

OrderList.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const isDemoMode = !!process.env.NEXT_PUBLIC_DEMO_MODE;

  const { data: orders } = await client.get(
    !isDemoMode ? "/api/orders" : "/orders"
  );

  const { data: users } = await client.get(
    !isDemoMode ? "/api/users" : "/users"
  );

  return { orders, users };
};

export default OrderList;
