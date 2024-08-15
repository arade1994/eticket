import express from "express";
import { currentUser } from "@radetickets/shared";
import { User } from "../models/User";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, async (req, res) => {
  let currentUser;
  if (req.currentUser) {
    currentUser = await User.findOne({ _id: req.currentUser?.id });
  }
  res.send({ currentUser: currentUser || null });
});

export { router as currentUserRouter };
