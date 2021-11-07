import { OrderCancelledEvent, OrderStatus } from "@radetickets/shared";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/Order";
import { natsWrapper } from "../../../natsWrapper";
import { OrderCancelledListener } from "../OrderCancelledListener";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.createNew({
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
    userId: "argsrg",
    version: 0,
  });
  await order.save();

  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    version: 1,
    ticket: {
      id: "dagrsg",
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    order,
    data,
    msg,
  };
};

it("Updates the status of order to cancelled", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(data.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("Acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
