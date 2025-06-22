import express, { type Request, type Response } from "express";

import {
  currentUser,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

import { User } from "../models/User";

const router = express.Router();

router.get(
  "/api/users",
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const users = await User.find();

    res.status(200).send(users);
  }
);

export { router as usersRouter };
