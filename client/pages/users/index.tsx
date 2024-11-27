import { type AxiosInstance } from "axios";
import { type NextPageContext } from "next";
import { type Rating, type User } from "../../types/user";
import {
  getIsUserRated,
  getNumOfCreatedTickets,
  getUserRaters,
  getUserRating,
} from "../../utils/user";
import { type Ticket } from "../../types/ticket";
import { useCallback, useEffect, useMemo, useState } from "react";
import RatingModal from "../../components/RatingModal";
import { useRequest } from "../../hooks/useRequest";
import RatingModalList from "../../components/RatingModalList";

interface Props {
  users: User[];
  tickets: Ticket[];
  currentUser: { id: string; email: string };
}

const UserList = ({ users, tickets, currentUser }: Props) => {
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

  const resetAllFilters = useCallback(() => {
    setSearchText("");
  }, []);

  const filteredUsers = useMemo(() => {
    let filteredUsers = [...users];

    if (searchText.trim() !== "")
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchText) ||
          user.lastName.toLowerCase().includes(searchText)
      );

    return filteredUsers;
  }, [users, searchText]);

  const areFiltersApplied = searchText.trim() !== "";

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        marginTop: "50px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        <input
          type="text"
          placeholder="Insert first name or last"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {areFiltersApplied && (
          <div
            style={{ cursor: "pointer", alignSelf: "center" }}
            onClick={resetAllFilters}
          >
            Reset filters
          </div>
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Tickets created</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user?.firstName}</td>
              <td>{user?.lastName}</td>
              <td>{user?.age}</td>
              <td>{user?.email}</td>
              <td>{getNumOfCreatedTickets(user, tickets)}</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {getUserRating(user.id, ratings)}
                  {getUserRaters(user.id, ratings)?.length
                    ? ` (${getUserRaters(user.id, ratings)?.length})`
                    : ""}
                  {getIsUserRated(user.id, ratings, currentUser.id) ? (
                    <div
                      style={{ cursor: "pointer", color: "lightcoral" }}
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setShowRatingsModalList(true);
                      }}
                    >
                      View
                    </div>
                  ) : null}
                </div>
              </td>
              <td>
                <button
                  disabled={
                    user.id === currentUser.id ||
                    getIsUserRated(user.id, ratings, currentUser.id) !== 0
                  }
                  style={{
                    fontWeight: "bolder",
                    borderRadius: 5,
                    backgroundColor:
                      user.id === currentUser.id ||
                      getIsUserRated(user.id, ratings, currentUser.id) !== 0
                        ? "lightgray"
                        : "rgba(7, 64, 82, 1)",
                    color:
                      user.id === currentUser.id ||
                      getIsUserRated(user.id, ratings, currentUser.id) !== 0
                        ? "black"
                        : "white",
                    fontSize: 20,
                    cursor:
                      user.id === currentUser.id ||
                      getIsUserRated(user.id, ratings, currentUser.id) !== 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setShowRatingModal(true);
                  }}
                >
                  Rate user
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showRatingModal && (
        <RatingModal
          open={showRatingModal}
          currentUserId={currentUser.id}
          selectedUserId={selectedUserId}
          handleCloseClick={() => setShowRatingModal(false)}
          fetchRatings={sendRequest}
        />
      )}
      {showRatingsModalList && (
        <RatingModalList
          open={showRatingsModalList}
          ratings={ratings}
          users={users}
          userId={selectedUserId}
          handleCloseClick={() => setShowRatingsModalList(false)}
        />
      )}
    </div>
  );
};

UserList.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const isDemoMode = !!process.env.NEXT_PUBLIC_DEMO_MODE;

  const { data: tickets } = await client.get(
    !isDemoMode ? "/api/tickets" : "/tickets"
  );

  const { data: users } = await client.get(
    !isDemoMode ? "/api/users" : "/users"
  );

  return { tickets, users };
};

export default UserList;
