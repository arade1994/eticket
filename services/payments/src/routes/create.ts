import express, { type Request, type Response } from "express";
import { body } from "express-validator";

import {
  BadRequestError,
  currentUser,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@radetickets/factory";

import { PaymentCreatedPublisher } from "../events/publishers/PaymentCreatedPublisher";
import { Order } from "../models/Order";
import { Payment } from "../models/Payment";
import { natsWrapper } from "../natsWrapper";
import { stripe } from "../stripe";

const router = express.Router();

router.post(
  "/api/payments",
  currentUser,
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order!");
    }

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: order.price,
      source: token,
    });

    const payment = Payment.createNew({
      orderId,
      stripeId: charge.id,
    });
    await payment.save();

    await new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ payment });
  }
);

export { router as createChargeRouter };
