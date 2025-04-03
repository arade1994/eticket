import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { type User } from "../../../types/user";

import classes from "./HeaderNavigation.module.scss";

interface Props {
  currentUser?: User;
}

const HeaderNavigation: React.FC<React.PropsWithChildren<Props>> = ({
  currentUser,
}) => {
  const router = useRouter();

  const isActive = useCallback(
    (path: string) => router.pathname === path,
    [router.pathname]
  );

  return currentUser ? (
    <nav className={classes.nav}>
      <Link
        className={`${classes.navLink} ${isActive("/") ? classes.active : ""}`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`${classes.navLink} ${
          isActive("/tickets") ? classes.active : ""
        }`}
        href="/tickets"
      >
        Tickets
      </Link>
      <Link
        className={`${classes.navLink} ${
          isActive("/orders") ? classes.active : ""
        }`}
        href="/orders"
      >
        Orders
      </Link>
      <Link
        className={`${classes.navLink} ${
          isActive("/users") ? classes.active : ""
        }`}
        href="/users"
      >
        Users
      </Link>
    </nav>
  ) : null;
};

export default HeaderNavigation;
