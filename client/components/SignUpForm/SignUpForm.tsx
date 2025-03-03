import { FormEvent, useCallback, useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";
import Router from "next/router";
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
          id="firstName"
          type="text"
          className={classes.formControl}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Last Name:</label>
        <input
          id="lastName"
          type="text"
          className={classes.formControl}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Age:</label>
        <input
          id="age"
          className={classes.formControl}
          type="number"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </div>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Email Address:</label>
        <input
          id="email"
          type="email"
          className={classes.formControl}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <label className={classes.formLabel}>Password:</label>
        <input
          id="password"
          className={classes.formControl}
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
