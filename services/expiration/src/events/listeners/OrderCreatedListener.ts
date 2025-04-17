import { type Message } from "node-nats-streaming";

import {
  Listener,
  type OrderCreatedEvent,
  Subjects,
} from "@radetickets/factory";

import { expirationQueue } from "../../queues/expirationQueue";

import { queueGroupName } from "./QueueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      { delay }
    );

    msg.ack();
  }
}
