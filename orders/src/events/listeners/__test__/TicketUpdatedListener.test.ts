import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@radetickets/shared";

import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/Ticket";
import { natsWrapper } from "../../../natsWrapper";
import { TicketUpdatedListener } from "../TicketUpdatedListener";

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);

  const ticket = Ticket.createNew({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Music Concert",
    price: 220,
  });
  await ticket.save();

  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    title: "Queen Tribute Concert",
    price: 220,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: ticket.version + 1,
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

describe("TicketUpdatedListener", () => {
  test("Finds, updates and saves a ticket", async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
  });

  test("Acks the message", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });

  test("Doesn't ack a message when version is out of order", async () => {
    const { listener, data, msg } = await setup();

    data.version = 10;

    try {
      await listener.onMessage(data, msg);
    } catch (err) {}

    expect(msg.ack).not.toHaveBeenCalled();
  });
});
