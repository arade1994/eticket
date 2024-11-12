import express, { Request, Response } from "express";
import { validateRequest } from "@radetickets/factory";

import { Ticket } from "../models/Ticket";

const router = express.Router();

router.get(
  "/api/tickets",
  validateRequest,
  async (req: Request, res: Response) => {
    const tickets = await Ticket.find({ orderId: undefined });

    res.send(tickets);
  }
);

export { router as getTicketsRouter };
