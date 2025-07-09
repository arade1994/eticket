import { type ChangeEvent, useCallback, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

import buildClient from "../../../api/buildClient";

import RateInput from "./RateInput/RateInput";

import classes from "./RateUserModal.module.scss";

const client = buildClient();

interface Props {
  open: boolean;
  currentUserId: string;
  selectedUserId: string;
  onClose: () => void;
  onFetchRatings: () => Promise<any>;
}

const RatingModal = ({
  open,
  currentUserId,
  selectedUserId,
  onClose,
  onFetchRatings,
}: Props) => {
  const [rate, setRate] = useState(5);
  const [comment, setComment] = useState("");

  const handleChangeRate = useCallback((value: number) => setRate(value), []);

  const handleChangeComment = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value),
    []
  );

  const handleRateUser = useCallback(async () => {
    try {
      await client.post("/api/users/rate", {
        rate,
        comment,
        userId: currentUserId,
        ratedUserId: selectedUserId,
      });
      onClose();
      toast.success("Successfully rated user");
      onFetchRatings();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }, [comment, currentUserId, onClose, onFetchRatings, rate, selectedUserId]);

  return (
    <Modal
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      appElement={document.createElement("div")}
      className={classes.rateUserModal}
      isOpen={open}
    >
      <div className={classes.rateUserModalHeader}>
        <h2>Rate user</h2>
        <div className={classes.exitButton} onClick={onClose}>
          <p>&times;</p>
        </div>
      </div>
      <RateInput
        comment={comment}
        onChangeComment={handleChangeComment}
        onChangeRate={handleChangeRate}
      />
      <div className={classes.rateUserModalActions}>
        <button className={classes.cancelBtn} onClick={onClose}>
          Cancel
        </button>
        <button className={classes.submitBtn} onClick={handleRateUser}>
          Save rating
        </button>
      </div>
    </Modal>
  );
};

export default RatingModal;
