import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  currentUser,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

import { Rating } from "../models/Rating";

const router = express.Router();

router.post(
  "/api/users/rate",
  [
    body("rate").isNumeric().withMessage("Rate data must be a number!"),
    body("comment").exists().withMessage("You must add a comment on rate!"),
    body("userId")
      .exists()
      .withMessage("User which is rating, must be provided"),
    body("ratedUserId")
      .exists()
      .withMessage("User which is rated must be provided!"),
  ],
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { rate, comment, userId, ratedUserId } = req.body;

    const rating = Rating.createNew({ rate, comment, userId, ratedUserId });
    await rating.save();

    res.status(201).send(rating);
  }
);

export { router as rateUserRouter };
