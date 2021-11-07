import mongoose from "mongoose";
import { OrderCancelledEvent } from "@radetickets/shared";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/Ticket";
import { natsWrapper } from "../../../natsWrapper";
import { OrderCancelledListener } from "../OrderCancelledListener";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const ticket = Ticket.createNew({
    title: "concert",
    price: 30,
    userId: "eagsrg",
  });
  const orderId = mongoose.Types.ObjectId().toHexString();
  ticket.set({ orderId });
  await ticket.save();

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, orderId, data, msg };
};

it("Updates the ticket", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();
});

it("Acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("Publishes and ticket updated event", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
