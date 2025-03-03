import { useCallback } from "react";
import cx from "classnames";

import { type Ticket } from "../../../types/ticket";
import { type Rating, type User } from "../../../types/user";
import {
  getIsUserRated,
  getNumOfCreatedTickets,
  getUserRating,
  getUserRatings,
} from "../../../utils/users";

import classes from "./UsersTable.module.scss";

const headerLabels = [
  "First Name",
  "Last Name",
  "Age",
  "Email",
  "Tickets Created",
  "Rating",
  "Actions",
];

interface Props {
  users: User[];
  ratings: Rating[];
  tickets: Ticket[];
  currentUser: { id: string; email: string };
  onSelectUser: (userId: string) => void;
  onOpenRatingsModalList: () => void;
  onOpenRatingModal: () => void;
}

const UsersTable: React.FC<React.PropsWithChildren<Props>> = ({
  users,
  ratings,
  tickets,
  currentUser,
  onSelectUser,
  onOpenRatingModal,
  onOpenRatingsModalList,
}) => {
  const isRatingDisabled = useCallback(
    (userId: string, currentUserId: string, ratings: Rating[]) =>
      userId === currentUserId ||
      getIsUserRated(userId, ratings, currentUserId),
    []
  );

  return (
    <table className={classes.usersTable}>
      <thead className={classes.usersTableHeader}>
        {headerLabels.map((label) => (
          <th key={label} className={classes.headerData}>
            {label}
          </th>
        ))}
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className={classes.usersTableRow}>
            <td className={classes.tableItem}>{user.firstName}</td>
            <td className={classes.tableItem}>{user.lastName}</td>
            <td className={classes.tableItem}>{user.age}</td>
            <td className={classes.tableItem}> {user.email}</td>
            <td className={classes.tableItem}>
              {getNumOfCreatedTickets(user.id, tickets)}
            </td>
            <td className={classes.tableItem}>
              <div className={classes.ratingItem}>
                {getUserRating(user.id, ratings)}
                {getUserRatings(user.id, ratings)?.length
                  ? ` (${getUserRatings(user.id, ratings)?.length})`
                  : ""}
                {getIsUserRated(user.id, ratings, currentUser.id) ? (
                  <div
                    className={classes.viewBtn}
                    onClick={() => {
                      onSelectUser(user.id);
                      onOpenRatingsModalList();
                    }}
                  >
                    View
                  </div>
                ) : null}
              </div>
            </td>
            <td className={classes.tableItem}>
              <div
                className={cx(
                  classes.rateUserBtn,
                  isRatingDisabled(user.id, currentUser.id, ratings)
                    ? classes.disabledBtn
                    : ""
                )}
                onClick={() => {
                  if (isRatingDisabled(user.id, currentUser.id, ratings))
                    return;
                  onSelectUser(user.id);
                  onOpenRatingModal();
                }}
              >
                Rate
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
