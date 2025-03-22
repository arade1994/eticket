import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import { type User } from "../types/user";

interface Props {
  currentUser: User;
}

const HomePage: React.FC<React.PropsWithChildren<Props>> = ({
  currentUser,
}) => {
  return <HomeLayout currentUser={currentUser} />;
};

export default HomePage;
