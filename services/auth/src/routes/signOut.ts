import express, { type Request, type Response } from "express";

import {
  currentUser,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

const router = express.Router();

router.post(
  "/api/users/signout",
  currentUser,
  requireAuth,
  validateRequest,
  (req: Request, res: Response) => {
    req.session = null;

    res.send({});
  }
);

export { router as signOutRouter };
