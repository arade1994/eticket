import { type GetServerSideProps } from "next";

import buildClient from "../../api/buildClient";
import TicketsLayout from "../../layouts/TicketsLayout/TicketsLayout";
import { type Ticket } from "../../types/ticket";
import { type Rating, type User } from "../../types/user";

interface Props {
  tickets: Ticket[];
  users: User[];
  ratings: Rating[];
}

const TicketsPage = ({ tickets, users, ratings }: Props) => {
  return <TicketsLayout ratings={ratings} tickets={tickets} users={users} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient(context);

  const { data: tickets } = await client.get("/api/tickets");
  const { data: users } = await client.get("/api/users");
  const { data: ratings } = await client.get("/api/users/ratings");

  return {
    props: {
      tickets,
      users,
      ratings,
    },
  };
};

export default TicketsPage;
