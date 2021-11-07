import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket";

const createTicket = async (title: string, price: number) => {
  const ticket = Ticket.createNew({
    id: mongoose.Types.ObjectId().toHexString(),
    title,
    price,
  });

  return await ticket.save();
};

const createOrder = async (user: string[], ticketId: number) => {
  return await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticketId })
    .expect(201);
};

it("fetches all orders for a specific user", async () => {
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
