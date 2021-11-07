import { useState } from "react";
import Router from "next/router";
import { useRequest } from "../../hooks/useRequest";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { sendRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: { title, price },
    onSuccess: () => Router.push("/"),
  });

  const onBlurHandler = () => {
    const value = parseFloat(price);

    if (isNaN(value)) return;

    setPrice(value.toFixed(2));
  };

  const onSubmitHandler = (event) => {
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
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateTicket;
