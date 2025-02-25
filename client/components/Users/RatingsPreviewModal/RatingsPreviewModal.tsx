import Modal from "react-modal";
import { Rating, User } from "../../../types/user";
import { useMemo } from "react";
import RateStars from "./RateStars/RateStars";
import classes from "./RatingsModalPreview.module.scss";

interface Props {
  open: boolean;
  ratings: Rating[];
  users: User[];
  userId: string;
  onClose: () => void;
}

const RatingModalList = ({ open, ratings, users, userId, onClose }: Props) => {
  const userRatings = useMemo(() => {
    return ratings
      .filter((rating) => rating.ratedUserId === userId)
      .map((rating) => {
        const user = users.find((user) => user.id === rating.userId);
        return {
          userId: user?.id,
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
      className={classes.ratingsModalPreview}
    >
      <div className={classes.ratingsModalPreviewHeader}>
        <h2>Ratings</h2>
        <div className={classes.exitButton} onClick={onClose}>
          <p>&times;</p>
        </div>
      </div>
      <div className={classes.ratingsList}>
        {userRatings.map((rating) => (
          <div key={rating.userId} className={classes.rating}>
            <h5>
              {rating.firstName} {rating.lastName}
            </h5>
            <div className={classes.rateContainer}>
              <div>{rating.rate.toFixed(1)}</div>
              <RateStars rate={rating.rate} />
            </div>
            <p>{rating.comment}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default RatingModalList;
