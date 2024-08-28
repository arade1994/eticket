import express from "express";
import { currentUser } from "@radetickets/shared";
import { User } from "../models/User";
import { Rating } from "../models/Rating";

const router = express.Router();

router.get("/api/users", currentUser, async (req, res) => {
  const users = await User.find();

  res.status(200).send(users);
});

export { router as usersRouter };
