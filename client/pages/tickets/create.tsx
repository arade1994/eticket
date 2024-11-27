import { type FormEvent, useState } from "react";
import Select from "react-select";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";
import { TICKET_CATEGORIES } from "../../utils/constants";

const categories = TICKET_CATEGORIES.map((category) => ({
  value: category.toLowerCase(),
  label: category,
}));

const CreateTicket: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);

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

  const onBlurHandler = () => {
    const value = parseFloat(price);

    if (isNaN(value)) return;

    setPrice(value.toFixed(2));
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendRequest();
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <h1>Create a new ticket</h1>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            onBlur={onBlurHandler}
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <Select
            value={category}
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateTicket;
