import { type Message } from "node-nats-streaming";

import {
  Listener,
  Subjects,
  type TicketUpdatedEvent,
} from "@radetickets/factory";

import { Ticket } from "../../models/Ticket";

import { queueGroupName } from "./QueueGroupName";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found!");
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
