import { type AxiosInstance } from "axios";
import { type NextPageContext } from "next";
import Link from "next/link";
import { type Ticket } from "../types/ticket";

interface Props {
  tickets: Ticket[];
}

const HomePage = ({ tickets }: Props) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>List of tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

HomePage.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default HomePage;
