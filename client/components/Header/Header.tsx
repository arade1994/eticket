import Link from "next/link";
import { usePathname } from "next/navigation";

import { type User } from "../../types/user";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

import classes from "./Header.module.scss";

interface Props {
  currentUser?: User;
}

export default ({ currentUser }: Props) => {
  const pathname = usePathname();

  console.log(currentUser);

  return (
    <header className={classes.headerContainer}>
      <nav className={classes.navigation}>
        <Link className={classes.logo} href="/">
          eTicket
        </Link>
        {currentUser ? (
          <ProfileIcon
            firstName={currentUser.firstName}
            lastName={currentUser.lastName}
          />
        ) : (
          <div className={classes.linksContainer}>
            <Link
              className={pathname === "/auth/signin" ? classes.activeLink : ""}
              href="/auth/signin"
            >
              Sign In
            </Link>
            <Link
              className={pathname === "/auth/signup" ? classes.activeLink : ""}
              href="/auth/signup"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
