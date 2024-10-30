import express from "express";
import { requireAuth, validateRequest } from "@radetickets/shared";

import { Rating } from "../models/Rating";

const router = express.Router();

router.get(
  "/api/users/ratings",
  requireAuth,
  validateRequest,
  async (req, res) => {
    const ratings = await Rating.find();
    res.status(200).send(ratings);
  }
);

export { router as ratingsRouter };
