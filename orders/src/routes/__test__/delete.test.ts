import { OrderStatus } from "@radetickets/shared";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Order } from "../../models/Order";
import { Ticket } from "../../models/Ticket";
import { natsWrapper } from "../../natsWrapper";

describe("Api which deletes order", () => {
  test("updates a order status to cancelled", async () => {
    const ticket = Ticket.createNew({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "concert",
      price: 200,
    });
    await ticket.save();

    const user = global.signin();

    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .delete(`/api/orders/${order.id}`)
      .set("Cookie", user)
      .send()
      .expect(204);

    const cancelledOrder = await Order.findById(order.id);

    expect(cancelledOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  test("emits an event when order is cancelled", async () => {
    const ticket = Ticket.createNew({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "concert",
      price: 200,
    });
    await ticket.save();

    const user = global.signin();

    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .delete(`/api/orders/${order.id}`)
      .set("Cookie", user)
      .send()
      .expect(204);

    const cancelledOrder = await Order.findById(order.id);

    expect(cancelledOrder!.status).toEqual(OrderStatus.Cancelled);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
