import { type GetServerSideProps } from "next";
import axios from "axios";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isDemoMode = !!process.env.NEXT_PUBLIC_DEMO_MODE;

  const baseURL = !isDemoMode
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
    : "http://localhost:3000";

  const client = axios.create({
    baseURL,
    headers: context.req.headers,
  });

  const { data: tickets } = await client.get("/tickets");
  const { data: users } = await client.get("/users");
  const { data: ratings } = await client.get("/ratings");

  return {
    props: {
      tickets,
      users,
      ratings,
    },
  };
};

export default HomePage;
