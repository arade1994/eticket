import { type Message } from "node-nats-streaming";

import { Listener, type OrderCreatedEvent, Subjects } from "@radetickets/factory";

import { Order } from "../../models/Order";

import { queueGroupName } from "./QueueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.createNew({
      id: data.id,
      version: data.version,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
    });
    await order.save();

    msg.ack();
  }
}
