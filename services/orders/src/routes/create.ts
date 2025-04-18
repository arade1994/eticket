import express, { type Request, type Response } from "express";
import { body } from "express-validator";
import { Types } from "mongoose";

import {
  BadRequestError,
  currentUser,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

import { OrderCreatedPublisher } from "../events/publishers/OrderCreatedPublisher";
import { Order } from "../models/Order";
import { Ticket } from "../models/Ticket";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

const EXPIRATION_IN_SECONDS = 15 * 60;

router.post(
  "/api/orders",
  currentUser,
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_IN_SECONDS);

    const order = Order.createNew({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
