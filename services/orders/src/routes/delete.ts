import express, { type Request, type Response } from "express";
import mongoose from "mongoose";

import {
  BadRequestError,
  currentUser,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

import { OrderCancelledPublisher } from "../events/publishers/OrderCancelledPublisher";
import { Order } from "../models/Order";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.orderId)) {
      throw new BadRequestError("OrderId is not valid");
    }

    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
