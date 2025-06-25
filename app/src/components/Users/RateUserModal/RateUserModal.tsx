import { type ChangeEvent, useCallback, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

import { useRequest } from "../../../hooks/useRequest";

import RateInput from "./RateInput/RateInput";

import classes from "./RateUserModal.module.scss";

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

  const { sendRequest } = useRequest({
    url: !process.env.REACT_PUBLIC_DEMO_MODE
      ? "/api/users/rate"
      : "http://localhost:3000/ratings",
    method: "post",
    body: { rate, comment, userId: currentUserId, ratedUserId: selectedUserId },
    onSuccess: () => {
      toast.success("Successfully rated user");
    },
  });

  const handleChangeRate = useCallback((value: number) => setRate(value), []);

  const handleChangeComment = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value),
    []
  );

  const handleSave = useCallback(async () => {
    await sendRequest();
    onClose();
    toast.success("User rated");
    onFetchRatings();
  }, [sendRequest, onClose, onFetchRatings]);

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
        <button className={classes.submitBtn} onClick={handleSave}>
          Save rating
        </button>
      </div>
    </Modal>
  );
};

export default RatingModal;
