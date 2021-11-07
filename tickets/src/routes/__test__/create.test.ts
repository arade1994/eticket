import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket";
import { natsWrapper } from "../../natsWrapper";

it("has a route handler listening to /api/tickets post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed when user is authenticated", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if user is authenticated", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error when invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 10 })
    .expect(400);
});

it("returns an error when invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", price: -10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test" })
    .expect(400);
});

it("creates a ticket with correct input parameters", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = "test";

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price: 20 })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(20);
});

it("publishes create ticket event", async () => {
  const title = "test";

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price: 20 })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
