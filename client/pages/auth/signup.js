import { useState } from "react";
import Router from "next/router";

import { useRequest } from "../../hooks/useRequest";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sendRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const submit = async (event) => {
    event.preventDefault();

    await sendRequest();
  };

  return (
    <form onSubmit={submit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address:</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default SignUp;
