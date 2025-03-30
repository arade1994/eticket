import request from "supertest";

import { app } from "../../app";
import { Ticket } from "../../models/Ticket";
import { natsWrapper } from "../../natsWrapper";

describe("Api to create new ticket", () => {
  test("has a route handler listening to /api/tickets post requests", async () => {
    const response = await request(app).post("/api/tickets").send({});

    expect(response.status).not.toEqual(404);
  });

  test("can only be accessed when user is authenticated", async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
  });

  test("returns a status other than 401 if user is authenticated", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({});

    expect(response.status).not.toEqual(401);
  });

  test("returns an error when invalid title is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({ title: "", price: 10, category: "Music Concert" })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({ price: 10, category: "Sport Event" })
      .expect(400);
  });

  test("returns an error when invalid price is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({ title: "U2 Concert", price: -10, category: "Music Concert" })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({ title: "U2 Concert", category: "Music Concert" })
      .expect(400);
  });

  test("returns an error when no category is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({ title: "Basketball Game", price: 120 })
      .expect(400);
  });

  test("creates a ticket with correct input parameters", async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = "Premier League Match";
    const price = 240;
    const category = "Sport Game";

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({ title, price, category })
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(price);
    expect(tickets[0].category).toEqual(category);
  });

  test("publishes create ticket event", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({ title: "Piano Concert", price: 20, category: "Music Event" })
      .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });
});
