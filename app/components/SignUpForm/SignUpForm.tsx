import { type FormEvent, useCallback, useMemo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";

import classes from "./SignUpForm.module.scss";

const SignUpForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState<number | string>("");
  const [monthOfBirth, setMonthOfBirth] = useState<number | string>("");
  const [yearOfBirth, setYearOfBirth] = useState<number | string>("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState<number | string>("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState<number | string>("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { register } = useAuth();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const signUpData = {
        firstName,
        lastName,
        dayOfBirth: +dayOfBirth,
        monthOfBirth: +monthOfBirth,
        yearOfBirth: +yearOfBirth,
        street,
        houseNumber: +houseNumber,
        postalCode: +postalCode,
        city,
        country,
        email,
        password,
        username,
        phoneNumber,
      };

      await register(signUpData);
    },
    [
      city,
      country,
      dayOfBirth,
      email,
      firstName,
      houseNumber,
      lastName,
      monthOfBirth,
      password,
      phoneNumber,
      postalCode,
      register,
      street,
      username,
      yearOfBirth,
    ]
  );

  const isPasswordMatching = useMemo(() => {
    if (password.trim() === "" || confirmPassword.trim() === "") return true;
    if (
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password !== confirmPassword
    )
      return false;
    return true;
  }, [password, confirmPassword]);

  return (
    <form className={classes.signUpForm} onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <p className={classes.subtitle}>
        Create your account to start your next adventure.
      </p>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="firstName"
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="lastName"
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className={classes.birthDateGroup}>
        <div className={classes.formGroup}>
          <input
            className={classes.formControl}
            id="dayOfBirth"
            placeholder="Day"
            type="number"
            value={dayOfBirth}
            onChange={(e) => setDayOfBirth(parseInt(e.target.value))}
          />
        </div>
        <div className={classes.formGroup}>
          <input
            className={classes.formControl}
            id="monthOfBirth"
            placeholder="Month"
            type="number"
            value={monthOfBirth}
            onChange={(e) => setMonthOfBirth(parseInt(e.target.value))}
          />
        </div>
        <div className={classes.formGroup}>
          <input
            className={classes.formControl}
            id="yearOfBirth"
            placeholder="Year"
            type="number"
            value={yearOfBirth}
            onChange={(e) => setYearOfBirth(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="street"
          placeholder="Street"
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="houseNumber"
          placeholder="House Number"
          type="number"
          value={houseNumber}
          onChange={(e) => setHouseNumber(parseInt(e.target.value))}
        />
      </div>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="city"
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="postalCode"
          placeholder="Postal Code"
          type="number"
          value={postalCode}
          onChange={(e) => setPostalCode(parseInt(e.target.value))}
        />
      </div>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="country"
          placeholder="Country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
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
      <div className={classes.formGroup}>
        {!isPasswordMatching && (
          <p className={classes.passwordError}>Passwords do not match</p>
        )}
        <input
          className={classes.formControl}
          id="confirmPassword"
          placeholder="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span
          className={classes.passwordToggle}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="username"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={classes.formGroup}>
        <input
          className={classes.formControl}
          id="phoneNumber"
          placeholder="Phone number"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button className={classes.submitBtn}>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
