import express from "express";
import { currentUser, requireAuth, validateRequest } from "@radetickets/shared";

const router = express.Router();

router.post(
  "/api/users/signout",
  currentUser,
  requireAuth,
  validateRequest,
  (req, res) => {
    req.session = null;

    res.send({});
  }
);

export { router as signOutRouter };
