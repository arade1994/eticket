import Head from "next/head";

import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import { type User } from "../types/user";

interface Props {
  currentUser: User;
}

const HomePage: React.FC<React.PropsWithChildren<Props>> = ({
  currentUser,
}) => {
  return (
    <>
      <Head>
        <title>eTicket - Your Event Ticket Marketplace</title>
      </Head>
      <HomeLayout currentUser={currentUser} />
    </>
  );
};

export default HomePage;
