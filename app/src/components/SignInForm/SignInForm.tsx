import { type FormEvent, useCallback, useState } from "react";
import { toast } from "react-toastify";

import { useRequest } from "../../hooks/useRequest";

import classes from "./SIgnInForm.module.scss";

const SignInForm: React.FC = () => {
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

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await sendRequest();
    },
    [sendRequest]
  );

  return (
    <form className={classes.signInForm} onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Email Address:</label>
        <input
          className={classes.formControl}
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Password:</label>
        <input
          className={classes.formControl}
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className={classes.submitBtn}>Sign In</button>
    </form>
  );
};

export default SignInForm;
