import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@radetickets/shared";

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
    body("age")
      .isFloat({ min: 18 })
      .withMessage("Users age must be bigger than 18!"),
    body("email").isEmail().withMessage("Email must be valid!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstName, lastName, age, email, password } = req.body;

    const usedUser = await User.findOne({ email });

    if (usedUser) {
      throw new BadRequestError("Email already in use!!!");
    }

    const user = User.createNew({ firstName, lastName, age, email, password });
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
