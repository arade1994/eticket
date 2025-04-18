import express, { type Request, type Response } from "express";

import {
  currentUser,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

import { Ticket } from "../models/Ticket";

const router = express.Router();

router.get(
  "/api/tickets/:id",
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    res.send(ticket);
  }
);

export { router as getTicketRouter };
