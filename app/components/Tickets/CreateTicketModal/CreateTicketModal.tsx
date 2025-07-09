import { type MouseEvent, useCallback, useState } from "react";
import Router from "next/router";
import Modal from "react-modal";
import Select from "react-select";
import { toast } from "react-toastify";

import buildClient from "../../../api/buildClient";
import { ticketCategoriesOptions } from "../../../utils/constants";

import classes from "./CreateTicketModal.module.scss";

const client = buildClient();

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTicketModal: React.FC<React.PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(ticketCategoriesOptions[0]);

  const handleBlur = useCallback(() => {
    const value = parseFloat(price);

    if (isNaN(value)) return;

    setPrice(value.toFixed(2));
  }, [price]);

  const handleSubmit = useCallback(
    async (event: MouseEvent) => {
      event?.preventDefault();

      try {
        await client.post("/api/tickets", {
          title,
          price,
          category: category.value,
        });
        toast.success("Successfully created new ticket");
        Router.push("/tickets");
        onClose();
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
    [category.value, price, title, onClose]
  );

  return (
    <Modal
      appElement={document.createElement("div")}
      className={classes.createTicketModal}
      isOpen={isOpen}
    >
      <div className={classes.createTicketContainer}>
        <div className={classes.createTicketFormHeader}>
          <h2>Create a new ticket</h2>
          <div className={classes.exitButton} id="exitBtn" onClick={onClose}>
            <p>&times;</p>
          </div>
        </div>
        <form className={classes.createTicketForm}>
          <div className={classes.formGroup}>
            <label className={classes.formLabel} htmlFor="title">
              Title
            </label>
            <input
              className={classes.formControl}
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <label className={classes.formLabel} htmlFor="price">
              Price
            </label>
            <input
              className={classes.formControl}
              id="price"
              type="number"
              value={price}
              onBlur={handleBlur}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <label className={classes.formLabel} htmlFor="category">
              Category
            </label>
            <Select
              id="categorySelect"
              options={ticketCategoriesOptions}
              value={category}
              onChange={(option) =>
                setCategory({
                  value: option?.value ?? "",
                  label: option?.label ?? "",
                })
              }
            />
          </div>
        </form>
        <div className={classes.formActions}>
          <button className={classes.cancelBtn} type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className={classes.submitBtn}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTicketModal;
