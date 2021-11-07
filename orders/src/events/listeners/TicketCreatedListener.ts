import { Listener, Subjects, TicketCreatedEvent } from "@radetickets/shared";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket";
import { queueGroupName } from "./QueueGroupName";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.createNew({ id, title, price });
    await ticket.save();

    msg.ack();
  }
}
