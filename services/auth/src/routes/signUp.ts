import express, { type Request, type Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError, validateRequest } from "@radetickets/factory";

import { User } from "../models/User";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("firstName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("First name must be longer than one string!"),
    body("lastName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("First name must be longer than one string!"),
    body("dayOfBirth")
      .isFloat({ min: 1, max: 31 })
      .withMessage("Day of birth must be betweeon 1 and 31!"),
    body("monthOfBirth")
      .isFloat({ min: 1, max: 12 })
      .withMessage("Month of birth must be between 1 and 12!"),
    body("yearOfBirth")
      .isFloat({ min: 1950, max: 2025 })
      .withMessage("Year of birth must be between 1950 and 2025!"),
    body("street")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Street must be longer than one string!"),
    body("houseNumber")
      .isFloat({ min: 1 })
      .withMessage("House number must be bigger than 1!"),
    body("postalCode")
      .isFloat({ min: 10000, max: 99999 })
      .withMessage("Postal code must be between 10000 and 99999!"),
    body("city")
      .trim()
      .isLength({ min: 1 })
      .withMessage("City must be longer than one string!"),
    body("country")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Country must be longer than one string!"),
    body("email").isEmail().withMessage("Email must be valid!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters!"),
    body("username")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Username must be longer than one string!"),
    body("phoneNumber")
      .isMobilePhone("any")
      .withMessage("Phone number must be valid!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      dayOfBirth,
      monthOfBirth,
      yearOfBirth,
      street,
      houseNumber,
      postalCode,
      city,
      country,
      email,
      password,
      username,
      phoneNumber,
    } = req.body;

    const usedEmail = await User.findOne({ email });

    if (usedEmail) {
      throw new BadRequestError("Email already in use!!!");
    }

    const usedUsername = await User.findOne({ username });

    if (usedUsername) {
      throw new BadRequestError("Username already in use!!!");
    }
    const user = User.createNew({
      firstName,
      lastName,
      dayOfBirth,
      monthOfBirth,
      yearOfBirth,
      street,
      houseNumber,
      postalCode,
      city,
      country,
      email,
      password,
      username,
      phoneNumber,
    });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
