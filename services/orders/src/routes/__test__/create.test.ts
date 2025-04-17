import mongoose from "mongoose";
import request from "supertest";

import { OrderStatus } from "@radetickets/factory";

import { app } from "../../app";
import { Order } from "../../models/Order";
import { Ticket } from "../../models/Ticket";
import { natsWrapper } from "../../natsWrapper";

describe("Api which creates a new order for a ticket", () => {
  test("returns an error if the ticket does not exist", async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
      .post("/api/orders")
      .set("Cookie", globalThis.signin())
      .send({ ticketId })
      .expect(404);
  });

  test("returns an error if the ticket is already reserved", async () => {
    const ticket = Ticket.createNew({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "concert",
      price: 20,
    });
    await ticket.save();

    const order = Order.createNew({
      ticket: ticket,
      userId: "aesgtdh4whgs",
      status: OrderStatus.Created,
      expiresAt: new Date(),
    });
    await order.save();

    await request(app)
      .post("/api/orders")
      .set("Cookie", globalThis.signin())
      .send({ ticketId: ticket.id })
      .expect(400);
  });

  test("successfully orders a ticket", async () => {
    const ticket = Ticket.createNew({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "concert",
      price: 20,
    });
    await ticket.save();

    await request(app)
      .post("/api/orders")
      .set("Cookie", globalThis.signin())
      .send({ ticketId: ticket.id })
      .expect(201);
  });

  test("emits an event when order is created", async () => {
    const ticket = Ticket.createNew({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: "concert",
      price: 20,
    });
    await ticket.save();

    await request(app)
      .post("/api/orders")
      .set("Cookie", globalThis.signin())
      .send({ ticketId: ticket.id })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
