import { type Message } from "node-nats-streaming";

import {
  type ExpirationCompleteEvent,
  Listener,
  OrderStatus,
  Subjects,
} from "@radetickets/factory";

import { Order } from "../../models/Order";
import { OrderCancelledPublisher } from "../publishers/OrderCancelledPublisher";

import { queueGroupName } from "./QueueGroupName";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) {
      throw new Error("Order was not found!");
    }

    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }

    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
