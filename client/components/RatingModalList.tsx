import Modal from "react-modal";
import { Rating, User } from "../types/user";
import { useMemo } from "react";
import RateStars from "./RateStars";

interface Props {
  open: boolean;
  ratings: Rating[];
  users: User[];
  userId: string;
  handleCloseClick: () => void;
}

const RatingModalList = ({
  open,
  ratings,
  users,
  userId,
  handleCloseClick,
}: Props) => {
  const userRatings = useMemo(() => {
    return ratings
      .filter((rating) => rating.ratedUserId === userId)
      .map((rating) => {
        const user = users.find((user) => user.id === rating.userId);
        return {
          rate: rating.rate,
          comment: rating.comment,
          firstName: user?.firstName,
          lastName: user?.lastName,
        };
      });
  }, [ratings, users]);

  return (
    <Modal
      isOpen={open}
      appElement={document.createElement("div")}
      style={{
        content: {
          width: 400,
          height: "fit-content",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3>Ratings</h3>
        </div>
        <div
          style={{ fontSize: 28, cursor: "pointer" }}
          onClick={handleCloseClick}
        >
          <p>&times;</p>
        </div>
      </div>
      <div>
        {userRatings.map((rating) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 5,
              }}
            >
              <h5>
                {rating.firstName} {rating.lastName}
              </h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <div style={{ marginTop: 3 }}>{rating.rate.toFixed(1)}</div>
                <RateStars rate={rating.rate} />
              </div>
            </div>
            <p>{rating.comment}</p>
            <hr style={{ margin: 0 }} />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default RatingModalList;
