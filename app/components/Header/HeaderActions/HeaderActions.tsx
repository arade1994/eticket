import Link from "next/link";

import { useAuth } from "../../../hooks/useAuth";
import { type User } from "../../../types/user";

import classes from "./HeaderActions.module.scss";

interface Props {
  currentUser?: User;
}

const HeaderActions: React.FC<React.PropsWithChildren<Props>> = ({
  currentUser,
}) => {
  const { logOut } = useAuth();

  return (
    <div className={classes.headerActions}>
      {currentUser ? (
        <button className={classes.signOutButton} onClick={logOut}>
          Log Out
        </button>
      ) : (
        <>
          <Link className={classes.signInButton} href="/auth/signin">
            Login
          </Link>
          <Link className={classes.signInButton} href="/auth/signup">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderActions;
