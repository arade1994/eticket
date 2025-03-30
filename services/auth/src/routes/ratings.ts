import express, { type Request, type Response } from "express";
import { validateRequest } from "@radetickets/factory";

import { Rating } from "../models/Rating";

const router = express.Router();

router.get(
  "/api/ratings",
  validateRequest,
  async (req: Request, res: Response) => {
    const ratings = await Rating.find();
    res.status(200).send(ratings);
  }
);

export { router as ratingsRouter };
