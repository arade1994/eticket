import { type FormEvent, useState } from "react";
import Router from "next/router";

import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { sendRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email, password },
    onSuccess: () => {
      toast.success("User successfully signed in");
      Router.push("/");
    },
  });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendRequest();
  };

  return (
    <form onSubmit={submit}>
      <h1>Sign In</h1>
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
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default SignUp;
