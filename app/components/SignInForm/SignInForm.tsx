import { type FormEvent, useCallback, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";

import classes from "./SIgnInForm.module.scss";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await login({ email, password });
    },
    [email, password, login]
  );

  return (
    <form className={classes.signInForm} onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <p className={classes.subtitle}>Welcome back! Please sign in.</p>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="email"
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className={classes.passwordToggle}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <button className={classes.submitBtn}>Sign In</button>
    </form>
  );
};

export default SignInForm;
