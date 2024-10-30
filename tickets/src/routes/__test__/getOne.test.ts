import { Types } from "mongoose";
import request from "supertest";

import { app } from "../../app";

describe("Api which fetches specific ticket by id", () => {
  test("returns a 404 if the ticket is not found", async () => {
    const id = new Types.ObjectId().toHexString();

    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  test("returns the ticket if the ticket is found", async () => {
    const title = "Basketball Game";
    const price = 140;
    const category = "Sport Event";

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({ title, price, category })
      .expect(201);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
    expect(ticketResponse.body.category).toEqual(category);
  });
});
