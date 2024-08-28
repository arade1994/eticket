import { type AxiosInstance } from "axios";
import { type NextPageContext } from "next";
import { type Ticket } from "../types/ticket";
import { Rating, type User } from "../types/user";
import TicketList from "../components/TicketList";
import { useCallback, useMemo, useState } from "react";
import Select from "react-select";
import { TICKET_CATEGORIES } from "../utils/constants";

interface Props {
  tickets: Ticket[];
  users: User[];
  ratings: Rating[];
}

const categories = TICKET_CATEGORIES.map((category) => ({
  value: category.toLowerCase(),
  label: category,
}));

const HomePage = ({ tickets, users, ratings }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<{ value: string; label: string }>({
    value: "-",
    label: "Any category",
  });
  const [selectedUser, setSelectedUser] = useState({
    value: "-",
    label: "Any user",
  });

  const resetAllFilters = useCallback(() => {
    setSearchText("");
    setCategory({ value: "-", label: "Any Category" });
    setSelectedUser({ value: "-", label: "Any user" });
  }, []);

  const filteredTickets = useMemo(() => {
    let filteredTickets = [...tickets];

    if (searchText.trim() !== "")
      filteredTickets = filteredTickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(searchText)
      );

    if (category.value !== "-")
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.category === category.value
      );

    if (selectedUser.value !== "-")
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.userId === selectedUser.value
      );

    return filteredTickets;
  }, [tickets, searchText, category, selectedUser]);

  const userOptions = useMemo(
    () =>
      users.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
      })),
    [users]
  );

  const areFiltersPopulated =
    searchText.trim() !== "" ||
    category.value !== "-" ||
    selectedUser.value !== "-";

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
          value={category}
          onChange={(option) => setCategory(option)}
          options={[{ value: "-", label: "Any category" }, ...categories]}
        />
        <Select
          value={selectedUser}
          onChange={(option) => setSelectedUser(option)}
          options={[{ value: "-", label: "Any user" }, ...userOptions]}
        />
        {areFiltersPopulated && (
          <div
            style={{ cursor: "pointer", alignSelf: "center" }}
            onClick={resetAllFilters}
          >
            Reset filters
          </div>
        )}
      </div>
      {filteredTickets.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price($)</th>
              <th>User</th>
              <th>Category</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <TicketList
              tickets={filteredTickets}
              users={users}
              ratings={ratings}
            />
          </tbody>
        </table>
      ) : (
        <h1 style={{ marginTop: "50px" }}>
          No available tickets! Go to Sell Tickets link to create some.
        </h1>
      )}
    </div>
  );
};

HomePage.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const { data: tickets } = await client.get("/api/tickets");

  const { data: users } = await client.get("/api/users");

  const { data: ratings } = await client.get("/api/users/ratings");

  return { tickets, users, ratings };
};

export default HomePage;
