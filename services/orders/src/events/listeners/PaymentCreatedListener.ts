import { type Message } from "node-nats-streaming";

import {
  Listener,
  OrderStatus,
  type PaymentCreatedEvent,
  Subjects,
} from "@radetickets/factory";

import { Order } from "../../models/Order";

import { queueGroupName } from "./QueueGroupName";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found!");
    }

    order.set({ status: OrderStatus.Complete });
    await order.save();

    msg.ack();
  }
}
