import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";

import { type User } from "../../types/user";

import HeaderActions from "./HeaderActions/HeaderActions";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";

import classes from "./Header.module.scss";

interface Props {
  currentUser: User;
}

const Header: React.FC<React.PropsWithChildren<Props>> = ({ currentUser }) => {
  return (
    <header className={classes.header}>
      <div className={classes.headerContent}>
        <Link className={classes.logo} href="/">
          <FaTicketAlt className={classes.logoIcon} />
          <span>eTicket</span>
        </Link>

        <HeaderNavigation currentUser={currentUser} />
        <HeaderActions currentUser={currentUser} />
      </div>
    </header>
  );
};

export default Header;
