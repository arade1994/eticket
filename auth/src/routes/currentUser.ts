import express, { type Request, type Response } from "express";
import { currentUser, validateRequest } from "@radetickets/factory";

import { User } from "../models/User";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  validateRequest,
  async (req: Request, res: Response) => {
    let currentUser;
    if (req.currentUser) {
      currentUser = await User.findOne({ _id: req.currentUser?.id });
    }
    res.send({ currentUser: currentUser || null });
  }
);

export { router as currentUserRouter };
