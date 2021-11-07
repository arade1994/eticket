import { TicketCreatedEvent } from "@radetickets/shared";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/Ticket";
import { natsWrapper } from "../../../natsWrapper";
import { TicketCreatedListener } from "../TicketCreatedListener";

const setup = () => {
  const listener = new TicketCreatedListener(natsWrapper.client);

  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: "concert",
    price: 50,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("Creates and saves a ticket", async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it("Acks the message", async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toBeCalled();
});
