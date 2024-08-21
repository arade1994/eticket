import { type AxiosInstance } from "axios";
import { type NextPageContext } from "next";
import { type User } from "../../types/user";
import { getNumOfCreatedTickets } from "../../utils/user";
import { type Ticket } from "../../types/ticket";
import { useState } from "react";
import { createPortal } from "react-dom";
import RatingModal from "../../components/RatingModal";

interface Props {
  users: User[];
  tickets: Ticket[];
}

const UserList = ({ users, tickets }: Props) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  console.log(showRatingModal);
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
              <td>{user?.rating?.toFixed(2) || "-"}</td>
              <td>
                <div
                  style={{ cursor: "pointer", fontWeight: "bolder" }}
                  onClick={() => setShowRatingModal(true)}
                >
                  Rate user
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showRatingModal && (
        <RatingModal
          open={showRatingModal}
          handleCloseClick={() => setShowRatingModal(false)}
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
