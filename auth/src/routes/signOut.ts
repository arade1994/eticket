import express from "express";
import { requireAuth, validateRequest } from "@radetickets/shared";

const router = express.Router();

router.post("/api/users/signout", requireAuth, validateRequest, (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signOutRouter };
