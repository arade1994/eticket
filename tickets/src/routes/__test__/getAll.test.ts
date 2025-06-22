import request from "supertest";

import { app } from "../../app";
import { createTicket } from "../../test/utils";

describe("Api to fetch all created tickets", () => {
  test("returns all tickets", async () => {
    await createTicket("Monthly Bus Ticket", 220, "Public Transport");
    await createTicket("Bethoveen Concert", 140, "Theatre Event");
    await createTicket("Carmina Burana", 80, "Opera Ticket");

    const response = await request(app)
      .get("/api/tickets")
      .set("Cookie", globalThis.signin())
      .send()
      .expect(200);

    expect(response.body.length).toEqual(3);
  });
});
