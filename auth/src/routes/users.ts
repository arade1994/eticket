import express from "express";
import { requireAuth, validateRequest } from "@radetickets/shared";

import { User } from "../models/User";

const router = express.Router();

router.get("/api/users", requireAuth, validateRequest, async (req, res) => {
  const users = await User.find();

  res.status(200).send(users);
});

export { router as usersRouter };
