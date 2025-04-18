import express, { type Request, type Response } from "express";
import { body } from "express-validator";

import {
  BadRequestError,
  currentUser,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

import { TicketUpdatedPublisher } from "../events/publishers/TicketUpdatedPublisher";
import { Ticket } from "../models/Ticket";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  currentUser,
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required!!!"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0!!!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.orderId) {
      throw new BadRequestError("Cannot edit reserved ticket!");
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({ title: req.body.title, price: req.body.price });
    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.send(ticket);
  }
);

export { router as updateRouter };
