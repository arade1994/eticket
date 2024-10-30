import express from "express";
import { requireAuth, validateRequest } from "@radetickets/shared";

import { User } from "../models/User";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  requireAuth,
  validateRequest,
  async (req, res) => {
    let currentUser;
    if (req.currentUser) {
      currentUser = await User.findOne({ _id: req.currentUser?.id });
    }
    res.send({ currentUser: currentUser || null });
  }
);

export { router as currentUserRouter };
