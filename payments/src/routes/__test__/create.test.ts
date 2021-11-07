import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Order } from "../../models/Order";
import { OrderStatus } from "@radetickets/shared";
import { stripe } from "../../stripe";
import { Payment } from "../../models/Payment";

it("Returns a 404 when trying to pay for a unexisting order", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "2radgsrg",
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("Returns 401 when charging an order which dont belong to current user", async () => {
  const order = Order.createNew({
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
    version: 0,
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "2radgsrg",
      orderId: order.id,
    })
    .expect(401);
});

it("Returns a 400 when charging an cancelled order", async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = Order.createNew({
    id: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Cancelled,
    version: 0,
    userId: userId,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "2radgsrg",
      orderId: order.id,
    })
    .expect(400);
});

it("Returns a 201 with all valid inputs", async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const price = Math.floor(Math.random() * 100000);
  const order = Order.createNew({
    id: mongoose.Types.ObjectId().toHexString(),
    price: price,
    status: OrderStatus.Created,
    version: 0,
    userId: userId,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({ token: "tok_visa", orderId: order.id })
    .expect(201);

  const stripeCharges = await stripe.charges.list({ limit: 50 });
  const stripeCharge = stripeCharges.data.find((charge) => {
    return charge.amount === price * 100;
  });

  expect(stripeCharge).toBeDefined();
  expect(stripeCharge!.currency).toEqual("usd");
  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripeCharge!.id,
  });
  expect(payment).not.toBeNull();
});
