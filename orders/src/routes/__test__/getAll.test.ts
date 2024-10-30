import request from "supertest";

import { app } from "../../app";
import { createOrder, createTicket } from "../../test/utils";

describe("Api which fetches all created orders", () => {
  test("fetches all orders for a specific user", async () => {
    const ticketOne = await createTicket("concert", 50);
    const ticketTwo = await createTicket("opera", 80);
    const ticketThree = await createTicket("basketball", 120);

    const userOne = global.signin();
    const userTwo = global.signin();

    const { body: orderOne } = await createOrder(userOne, ticketOne.id);
    const { body: orderTwo } = await createOrder(userTwo, ticketTwo.id);
    const { body: orderThree } = await createOrder(userTwo, ticketThree.id);

    const { body: orders } = await request(app)
      .get("/api/orders")
      .set("Cookie", userTwo)
      .send()
      .expect(200);

    expect(orders.length).toEqual(2);
    expect(orders[0].id).toEqual(orderTwo.id);
    expect(orders[1].id).toEqual(orderThree.id);
    expect(orders[0].ticket.id).toEqual(ticketTwo.id);
    expect(orders[1].ticket.id).toEqual(ticketThree.id);
  });
});
