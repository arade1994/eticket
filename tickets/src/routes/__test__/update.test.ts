import mongoose from "mongoose";
import request from "supertest";

import { app } from "../../app";
import { Ticket } from "../../models/Ticket";
import { natsWrapper } from "../../natsWrapper";

describe("Api which updates one specific ticket", () => {
  test("return a 401 if user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({ title: "test", price: 20 })
      .expect(401);
  });

  test("returns a 404 if provided ticket id does not exist", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", globalThis.signin())
      .send({ title: "Bus Ticket", price: 20, category: "Public Transport" })
      .expect(404);
  });

  test("returns a 401 if user does not own the ticket", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", globalThis.signin())
      .send({ title: "Bus Ticket", price: 20, category: "Public Transport" })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", globalThis.signin())
      .send({
        title: "Monthly Bus Pass",
        price: 100,
        category: "Public Transport",
      })
      .expect(401);
  });

  test("return a 400 if provided bad data", async () => {
    const cookie = globalThis.signin();

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({ title: "Music Concert", price: 20, category: "Musical Event" })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({ title: "", price: 100 })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({ title: "Concert", price: -10 })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({ price: 100 })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({ title: "Concert" })
      .expect(400);
  });

  test("returns a 200 when user successfully updates a ticket", async () => {
    const cookie = globalThis.signin();

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({ title: "Bus Ticket", price: 20, category: "Public Transport" })
      .expect(201);

    const updatedTicketResponse = await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "Monthly Bus Pass",
        price: 100,
        category: "Public Transport",
      })
      .expect(200);

    expect(updatedTicketResponse.body.title).toEqual("Monthly Bus Pass");
    expect(updatedTicketResponse.body.price).toEqual(100);
  });

  test("publishes an ticket update event", async () => {
    const cookie = globalThis.signin();

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({ title: "Concert", price: 100, category: "Music Event" })
      .expect(201);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({ title: "U2 Concert", price: 100 })
      .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });

  test("Rejects the update if ticket is already reserved", async () => {
    const cookie = globalThis.signin();

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({ title: "LaLiga Match", price: 245, category: "Sport Event" })
      .expect(201);

    const ticket = await Ticket.findById(response.body.id);
    ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
    await ticket!.save();

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({ title: "El Classico", price: 350 })
      .expect(400);
  });
});
