import express, { Request, Response } from "express";
import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@radetickets/shared";

import { Ticket } from "../models/Ticket";

const router = express.Router();

router.get(
  "/api/tickets/:id",
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
