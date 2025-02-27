import { FormEvent, useCallback, useState } from "react";
import { ticketCategoriesOptions } from "../../../utils/constants";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";
import Router from "next/router";
import Modal from "react-modal";
import Select from "react-select";
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
      isOpen={isOpen}
      appElement={document.createElement("div")}
      className={classes.createTicketModal}
    >
      <div className={classes.createTicketContainer}>
        <div className={classes.createTicketFormHeader}>
          <h2>Create a new ticket</h2>
          <div id="exitBtn" className={classes.exitButton} onClick={onClose}>
            <p>&times;</p>
          </div>
        </div>
        <form className={classes.createTicketForm} onSubmit={onSubmitHandler}>
          <div className={classes.formGroup}>
            <label htmlFor="title" className={classes.formLabel}>
              Title
            </label>
            <input
              id="title"
              className={classes.formControl}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="price" className={classes.formLabel}>
              Price
            </label>
            <input
              id="price"
              type="number"
              onBlur={onBlurHandler}
              className={classes.formControl}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="category" className={classes.formLabel}>
              Category
            </label>
            <Select
              id="categorySelect"
              value={category}
              onChange={(option) =>
                setCategory({
                  value: option?.value ?? "",
                  label: option?.label ?? "",
                })
              }
              options={ticketCategoriesOptions}
            />
          </div>
          {errors}
          <div className={classes.formActions}>
            <button
              type="button"
              className={classes.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={classes.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTicketModal;
