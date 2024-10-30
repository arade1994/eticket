import mongoose from "mongoose";
import { ExpirationCompleteEvent, OrderStatus } from "@radetickets/shared";

import { Order } from "../../../models/Order";
import { Ticket } from "../../../models/Ticket";
import { natsWrapper } from "../../../natsWrapper";
import { ExpirationCompleteListener } from "../ExpirationCompleteListener";

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.createNew({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Bon Jovi Concert",
    price: 230,
  });
  await ticket.save();

  const order = Order.createNew({
    status: OrderStatus.Created,
    userId: "agsrgs",
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, ticket, data, msg };
};

describe("ExpirationCompleteListener", () => {
  test("Updates the status to cancelled", async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  test("Emits the OrderCancelled events", async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse(
      (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );
    expect(eventData.id).toEqual(order.id);
  });

  test("Acks the message", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
