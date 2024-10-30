import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@radetickets/shared";

import { Ticket } from "../models/Ticket";

const router = express.Router();

router.get(
  "/api/tickets",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const tickets = await Ticket.find({ orderId: undefined });

    res.send(tickets);
  }
);

export { router as getTicketsRouter };
