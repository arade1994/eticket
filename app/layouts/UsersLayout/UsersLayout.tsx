import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

import buildClient from "../../api/buildClient";
import RatingModal from "../../components/Users/RateUserModal/RateUserModal";
import RatingModalList from "../../components/Users/RatingsPreviewModal/RatingsPreviewModal";
import UsersFilters from "../../components/Users/UsersFilters/UsersFilters";
import UsersTable from "../../components/Users/UsersTable/UsersTable";
import { type Ticket } from "../../types/ticket";
import { type Rating, type User } from "../../types/user";
import { filterUsers } from "../../utils/users";

import classes from "./UsersLayout.module.scss";

const client = buildClient();

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

  const handleFetchRatings = useCallback(async () => {
    try {
      const { data: ratings } = await client.get("/api/users/ratings");
      setRatings(ratings);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }, []);

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
    handleFetchRatings();
  }, [handleFetchRatings]);

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
          onFetchRatings={handleFetchRatings}
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
