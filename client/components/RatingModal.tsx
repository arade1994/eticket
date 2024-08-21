import Modal from "react-modal";

interface Props {
  open: boolean;
  handleCloseClick: () => void;
}

const RatingModal = ({ open, handleCloseClick }: Props) => {
  return (
    <Modal
      isOpen={open}
      style={{
        content: {
          width: 500,
          height: 500,
          margin: "auto",
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
        </div>{" "}
        <p style={{ fontSize: 24 }}>x</p>
      </div>
    </Modal>
  );
};

export default RatingModal;
