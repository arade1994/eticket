import mongoose from "mongoose";
import { type Message } from "node-nats-streaming";

import { type TicketCreatedEvent } from "@radetickets/factory";

import { Ticket } from "../../../models/Ticket";
import { natsWrapper } from "../../../natsWrapper";
import { TicketCreatedListener } from "../TicketCreatedListener";

const setup = () => {
  const listener = new TicketCreatedListener(natsWrapper.client);

  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: "Buss Monthly Pass",
    price: 150,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  //@ts-expect-error
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

describe("TicketCreatedListener", () => {
  test("Creates and saves a ticket", async () => {
    const { listener, data, msg } = setup();

    await listener.onMessage(data, msg);

    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
  });

  test("Acks the message", async () => {
    const { listener, data, msg } = setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
