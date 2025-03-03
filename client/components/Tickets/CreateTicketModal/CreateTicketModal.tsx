import { type FormEvent, useCallback, useState } from "react";
import Router from "next/router";
import Modal from "react-modal";
import Select from "react-select";
import { toast } from "react-toastify";

import { useRequest } from "../../../hooks/useRequest";
import { ticketCategoriesOptions } from "../../../utils/constants";

import classes from "./CreateTicketModal.module.scss";

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

  const { sendRequest, errors } = useRequest({
    url: !process.env.NEXT_PUBLIC_DEMO_MODE
      ? "/api/tickets"
      : "http://localhost:3000/tickets",
    method: "post",
    body: { title, price, category: category.value },
    onSuccess: () => {
      toast.success("Successfully created new ticket");
      Router.push("/");
    },
  });

  const onBlurHandler = useCallback(() => {
    const value = parseFloat(price);

    if (isNaN(value)) return;

    setPrice(value.toFixed(2));
  }, [price]);

  const onSubmitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      sendRequest();
    },
    [sendRequest]
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
        <form className={classes.createTicketForm} onSubmit={onSubmitHandler}>
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
              onBlur={onBlurHandler}
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
          {errors}
          <div className={classes.formActions}>
            <button
              className={classes.cancelBtn}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className={classes.submitBtn} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTicketModal;
