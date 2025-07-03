import express, { type Request, type Response } from "express";

import {
  currentUser,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

import { Order } from "../models/Order";

const router = express.Router();

router.get(
  "/api/orders",
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate("ticket");

    res.send(orders);
  }
);

export { router as getOrdersRouter };
