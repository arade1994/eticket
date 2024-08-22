import { type AxiosInstance } from "axios";
import { type NextPageContext } from "next";
import { type Rating, type User } from "../../types/user";
import { getNumOfCreatedTickets } from "../../utils/user";
import { type Ticket } from "../../types/ticket";
import { useCallback, useEffect, useState } from "react";
import RatingModal from "../../components/RatingModal";
import { useRequest } from "../../hooks/useRequest";

interface Props {
  users: User[];
  tickets: Ticket[];
  currentUser: { id: string; email: string };
}

const UserList = ({ users, tickets, currentUser }: Props) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const { sendRequest } = useRequest({
    url: "/api/users/ratings",
    method: "get",
    body: {},
    onSuccess: (data: Rating[]) => {
      setRatings(data);
    },
  });

  const getUserRating = useCallback(
    (userId: string) => {
      const userRates = ratings
        .filter((rating) => rating.ratedUserId === userId)
        ?.map((rating) => rating.rate);
      const ratesSum = userRates.reduce((a, b) => a + b, 0);
      if (!ratesSum || isNaN(ratesSum)) return "-";
      return (ratesSum / userRates.length).toFixed(1);
    },
    [ratings]
  );

  const getIsUserRated = useCallback(
    (userId: string) =>
      ratings.filter(
        (rating) =>
          rating.ratedUserId === userId && rating.userId === currentUser.id
      )?.length,
    [ratings, currentUser]
  );

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <>
      <h1>List of users</h1>
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user?.firstName}</td>
              <td>{user?.lastName}</td>
              <td>{user?.age}</td>
              <td>{user?.email}</td>
              <td>{getNumOfCreatedTickets(user, tickets)}</td>
              <td>{getUserRating(user.id)}</td>
              <td>
                <button
                  disabled={
                    user.id === currentUser.id || getIsUserRated(user.id) !== 0
                  }
                  style={{
                    fontWeight: "bolder",
                    borderRadius: 5,
                    backgroundColor:
                      user.id === currentUser.id ||
                      getIsUserRated(user.id) !== 0
                        ? "lightgray"
                        : "rgba(7, 64, 82, 1)",
                    color:
                      user.id === currentUser.id ||
                      getIsUserRated(user.id) !== 0
                        ? "black"
                        : "white",
                    fontSize: 20,
                    cursor:
                      user.id === currentUser.id ||
                      getIsUserRated(user.id) !== 0
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
    </>
  );
};

UserList.getInitialProps = async (
  context: NextPageContext,
  client: AxiosInstance
) => {
  const { data: tickets } = await client.get("/api/tickets");

  const { data: users } = await client.get("/api/users");

  return { tickets, users };
};

export default UserList;
