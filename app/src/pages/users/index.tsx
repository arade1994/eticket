import axios from "axios";
import { type ParsedUrlQuery } from "querystring";

import UsersLayout from "../../layouts/UsersLayout/UsersLayout";
import { type Ticket } from "../../types/ticket";
import { type RequestWithUser, type User } from "../../types/user";

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
  const isDemoMode = !!process.env.REACT_PUBLIC_DEMO_MODE;
  const req = context.req as RequestWithUser;

  const baseURL = !isDemoMode
    ? process.env.REACT_PUBLIC_API_URL || "http://localhost:3000/api"
    : "http://localhost:3000";

  const client = axios.create({
    baseURL,
    headers: context.req.headers,
  });

  const { data: tickets } = await client.get("/tickets");
  const { data: users } = await client.get("/users");

  return {
    props: {
      tickets,
      users,
      currentUser: req.currentUser || { id: "", email: "" },
    },
  };
};

export default UserList;
