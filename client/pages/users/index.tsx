import { type NextPageContext } from "next";
import { type AxiosInstance } from "axios";

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

UserList.getInitialProps = async (
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

  return { tickets, users };
};

export default UserList;
