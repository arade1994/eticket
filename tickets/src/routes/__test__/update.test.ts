import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { natsWrapper } from "../../natsWrapper";
import { Ticket } from "../../models/Ticket";

it("returns a 404 if provided ticket id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 })
    .expect(404);
});

it("return a 401 if user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "test", price: 20 })
    .expect(401);
});

it("returns a 401 if user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "test2", price: 100 })
    .expect(401);
});

it("return a 400 if provided bad title and price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "test", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 100 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "test2", price: -10 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ price: 100 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "test2" })
    .expect(400);
});

it("returns a 200 when user successfully updates a ticket", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "test", price: 20 })
    .expect(201);

  const updatedTicketResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "test2", price: 100 })
    .expect(200);

  expect(updatedTicketResponse.body.title).toEqual("test2");
  expect(updatedTicketResponse.body.price).toEqual(100);
});

it("publishes an ticket update event", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "test", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "test2", price: 100 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("Rejects the update if ticket is already reserved", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "test", price: 20 })
    .expect(201);

  const ticket = await Ticket.findById(response.body.id);
  ticket!.set({ orderId: mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "test2", price: 100 })
    .expect(400);
});
