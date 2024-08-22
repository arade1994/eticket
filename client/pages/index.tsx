import { type AxiosInstance } from "axios";
import { type NextPageContext } from "next";
import { type Ticket } from "../types/ticket";
import { Rating, type User } from "../types/user";
import TicketList from "../components/TicketList";

interface Props {
  tickets: Ticket[];
  users: User[];
  ratings: Rating[];
}

const HomePage = ({ tickets, users, ratings }: Props) => {
  return (
    <>
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
          <TicketList tickets={tickets} users={users} ratings={ratings} />
        </tbody>
      </table>
    </>
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
