import express, { type Request, type Response } from "express";
import mongoose from "mongoose";

import {
  BadRequestError,
  currentUser,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

import { Order } from "../models/Order";

const router = express.Router();

router.get(
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

    res.send(order);
  }
);

export { router as getOrderRouter };
