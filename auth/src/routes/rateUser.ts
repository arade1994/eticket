import { validateRequest } from "@radetickets/shared";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Rating } from "../models/Rating";

const router = express.Router();

router.post(
  "/api/users/rate",
  [
    body("rate").isNumeric().withMessage("Rate data must be a number!"),
    body("userId")
      .exists()
      .withMessage("User which is rating, must be provided"),
    body("ratedUserId")
      .exists()
      .withMessage("User which is rated must be provided!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { rate, userId, ratedUserId } = req.body;

    const rating = Rating.createNew({ rate, userId, ratedUserId });
    await rating.save();

    res.status(201).send(rating);
  }
);

export { router as rateUserRouter };
