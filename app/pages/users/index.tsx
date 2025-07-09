import {
  type GetServerSideProps,
  type GetServerSidePropsContext,
  type PreviewData,
} from "next";
import { type ParsedUrlQuery } from "querystring";

import buildClient from "../../api/buildClient";
import UsersLayout from "../../layouts/UsersLayout/UsersLayout";
import { type Ticket } from "../../types/ticket";
import { type User } from "../../types/user";

interface Props {
  users: User[];
  tickets: Ticket[];
  currentUser: { id: string; email: string };
}

const UserList = ({ users, tickets, currentUser }: Props) => {
  return (
    <UsersLayout currentUser={currentUser} tickets={tickets} users={users} />
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const client = buildClient(context);

  const { data: tickets } = await client.get("/api/tickets");
  const { data: users } = await client.get("/api/users");
  const { data: currentUser } = await client.get("/api/users/currentuser");

  return {
    props: {
      tickets,
      users,
      currentUser,
    },
  };
};

export default UserList;
