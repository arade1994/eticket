import express, { type Request, type Response } from "express";
import { body } from "express-validator";

import {
  currentUser,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

import { TicketCreatedPublisher } from "../events/publishers/TicketCreatedPublisher";
import { Ticket } from "../models/Ticket";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.post(
  "/api/tickets",
  currentUser,
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required!!!"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0!!!"),
    body("category").exists().withMessage("Category must be selected!!!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price, category } = req.body;

    const ticket = Ticket.createNew({
      title,
      price,
      category,
      userId: req.currentUser!.id,
    });

    await ticket.save();
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
