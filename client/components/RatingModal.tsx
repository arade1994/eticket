import { useCallback, useState } from "react";
import Modal from "react-modal";
import { useRequest } from "../hooks/useRequest";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  currentUserId: string;
  selectedUserId: string;
  handleCloseClick: () => void;
  fetchRatings: () => Promise<any>;
}

const RatingModal = ({
  open,
  currentUserId,
  selectedUserId,
  handleCloseClick,
  fetchRatings,
}: Props) => {
  const [rate, setRate] = useState(5);
  const { sendRequest, isLoading } = useRequest({
    url: "/api/users/rate",
    method: "post",
    body: { rate, userId: currentUserId, ratedUserId: selectedUserId },
    onSuccess: () => {},
  });

  const handleSave = useCallback(async () => {
    await sendRequest();
    handleCloseClick();
    toast.success("User rated");
    fetchRatings();
  }, [sendRequest, handleCloseClick]);

  return (
    <Modal
      isOpen={open}
      appElement={document.createElement("div")}
      style={{
        content: {
          width: 400,
          height: 300,
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
          <h3>Edit user rating</h3>
        </div>
        <div
          style={{ fontSize: 28, cursor: "pointer" }}
          onClick={handleCloseClick}
        >
          <p>&times;</p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          textAlign: "center",
        }}
      >
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={rate}
          onChange={(e) => setRate(+e.target.value)}
        />
        <div style={{ fontSize: 24 }}>{rate}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <button
          style={{
            borderRadius: 5,
            background: "rgba(7, 64, 82, 1)",
            color: "white",
            fontSize: 20,
          }}
          onClick={handleSave}
        >
          Save rating
        </button>
        <button
          style={{
            borderRadius: 5,
            fontSize: 20,
            background: "white",
          }}
          onClick={handleCloseClick}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default RatingModal;
