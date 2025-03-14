import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import RatingModal from "../../components/Users/RateUserModal/RateUserModal";
import RatingModalList from "../../components/Users/RatingsPreviewModal/RatingsPreviewModal";
import UsersFilters from "../../components/Users/UsersFilters/UsersFilters";
import UsersTable from "../../components/Users/UsersTable/UsersTable";
import { useRequest } from "../../hooks/useRequest";
import { type Ticket } from "../../types/ticket";
import { type Rating, type User } from "../../types/user";
import { filterUsers } from "../../utils/users";

import classes from "./UsersLayout.module.scss";

interface Props {
  users: User[];
  tickets: Ticket[];
  currentUser: { id: string; email: string };
}

const UsersLayout: React.FC<React.PropsWithChildren<Props>> = ({
  users,
  tickets,
  currentUser,
}) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showRatingsModalList, setShowRatingsModalList] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [searchText, setSearchText] = useState("");

  const { sendRequest } = useRequest({
    url: !process.env.NEXT_PUBLIC_DEMO_MODE
      ? "/api/users/ratings"
      : "http://localhost:3000/ratings",
    method: "get",
    body: {},
    onSuccess: (data: Rating[]) => {
      setRatings(data);
    },
  });

  const handleChangeSearchText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value),
    []
  );

  const handleResetFilters = useCallback(() => setSearchText(""), []);

  const handleSelectUser = useCallback(
    (userId: string) => setSelectedUserId(userId),
    []
  );

  const handleToggleRatingsModalList = useCallback(
    () => setShowRatingsModalList((prevState) => !prevState),
    []
  );

  const handleToggleRatingModal = useCallback(
    () => setShowRatingModal((prevState) => !prevState),
    []
  );

  const filteredUsers = useMemo(
    () => filterUsers(users, searchText),
    [users, searchText]
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return (
    <div className={classes.usersLayout}>
      <UsersFilters
        searchText={searchText}
        onChangeSearchText={handleChangeSearchText}
        onResetFilters={handleResetFilters}
      />
      <UsersTable
        currentUser={currentUser}
        ratings={ratings}
        tickets={tickets}
        users={filteredUsers}
        onOpenRatingModal={handleToggleRatingModal}
        onOpenRatingsModalList={handleToggleRatingsModalList}
        onSelectUser={handleSelectUser}
      />
      {showRatingModal && (
        <RatingModal
          currentUserId={currentUser.id}
          open={showRatingModal}
          selectedUserId={selectedUserId}
          onClose={handleToggleRatingModal}
          onFetchRatings={sendRequest}
        />
      )}
      {showRatingsModalList && (
        <RatingModalList
          isOpen={showRatingsModalList}
          ratings={ratings}
          userId={selectedUserId}
          users={users}
          onClose={handleToggleRatingsModalList}
        />
      )}
    </div>
  );
};

export default UsersLayout;
