import mongoose from "mongoose";
import request from "supertest";

import { app } from "../../app";
import { Ticket } from "../../models/Ticket";

describe("Api which fetches one specific order by its id", () => {
  test("returns a order with specific id", async () => {
    const ticket = Ticket.createNew({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "concert",
      price: 20,
    });
    await ticket.save();

    const user = globalThis.signin();

    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);

    const { body: fetchedOrder } = await request(app)
      .get(`/api/orders/${order.id}`)
      .set("Cookie", user)
      .send()
      .expect(200);

    expect(order.id).toEqual(fetchedOrder.id);
  });

  test("returns an error when user tries to fetch order from another user", async () => {
    const ticket = Ticket.createNew({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "concert",
      price: 20,
    });
    await ticket.save();

    const user = globalThis.signin();

    const { body: order } = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ ticketId: ticket.id })
      .expect(201);

    await request(app)
      .get(`/api/orders/${order.id}`)
      .set("Cookie", globalThis.signin())
      .send()
      .expect(401);
  });
});
