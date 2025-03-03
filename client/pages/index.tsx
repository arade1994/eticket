import { type NextPageContext } from "next";
import { type AxiosInstance } from "axios";

import TicketsLayout from "../layouts/TicketsLayout/TicketsLayout";
import { type Ticket } from "../types/ticket";
import { type Rating, type User } from "../types/user";

interface Props {
  tickets: Ticket[];
  users: User[];
  ratings: Rating[];
}

const HomePage = ({ tickets, users, ratings }: Props) => {
  return <TicketsLayout ratings={ratings} tickets={tickets} users={users} />;
};

HomePage.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const isDemoMode = !!process.env.NEXT_PUBLIC_DEMO_MODE;

  const { data: tickets } = await client.get(
    !isDemoMode ? "/api/tickets" : "/tickets"
  );

  const { data: users } = await client.get(
    !isDemoMode ? "/api/users" : "/users"
  );

  const { data: ratings } = await client.get(
    !isDemoMode ? "/api/users/ratings" : "/ratings"
  );

  return { tickets, users, ratings };
};

export default HomePage;
