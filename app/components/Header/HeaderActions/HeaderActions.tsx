import Link from "next/link";
import { FaBell } from "react-icons/fa";

import { useAuth } from "../../../hooks/useAuth";
import { useNotification } from "../../../hooks/useNotification";
import { type User } from "../../../types/user";

import classes from "./HeaderActions.module.scss";

interface Props {
  currentUser?: User;
}

const HeaderActions: React.FC<React.PropsWithChildren<Props>> = ({
  currentUser,
}) => {
  const { signOut } = useAuth();
  const { notifications, markAsRead, clearAll } = useNotification();

  return (
    <div className={classes.headerActions}>
      {currentUser ? (
        <>
          <div className={classes.notifications}>
            <button
              className={classes.notificationButton}
              onClick={() => {
                // Toggle notifications dropdown
              }}
            >
              <FaBell aria-label="notifications-bell" />
              {notifications.some((n) => !n.read) && (
                <span className={classes.notificationBadge} />
              )}
            </button>
            <div className={classes.notificationDropdown}>
              <div className={classes.notificationHeader}>
                <h3>Notifications</h3>
                <button className={classes.clearButton} onClick={clearAll}>
                  Clear All
                </button>
              </div>
              <div className={classes.notificationList}>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`${classes.notificationItem} ${
                      !notification.read ? classes.unread : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <p>{notification.message}</p>
                    <span className={classes.notificationTime}>
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className={classes.signOutButton} onClick={signOut}>
            Sign Out
          </button>
        </>
      ) : (
        <Link className={classes.signInButton} href="/auth/signin">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default HeaderActions;
