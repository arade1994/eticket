import { type FormEvent, useCallback, useState } from "react";
import { toast } from "react-toastify";

import { useRequest } from "../../hooks/useRequest";

import classes from "./SignUpForm.module.scss";

const SignUpForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { sendRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { firstName, lastName, age, email, password },
    onSuccess: () => {
      toast.success("You are signed up!");
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
    <form className={classes.signUpForm} onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>First Name:</label>
        <input
          className={classes.formControl}
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Last Name:</label>
        <input
          className={classes.formControl}
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Age:</label>
        <input
          className={classes.formControl}
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </div>
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
      <button className={classes.submitBtn}>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
