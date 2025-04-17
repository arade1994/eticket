import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import request from "supertest";

import { app } from "../app";
import { Ticket } from "../models/Ticket";

export const signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  const base64 = Buffer.from(
    JSON.stringify({ jwt: jwt.sign(payload, process.env.JWT_KEY!) })
  ).toString("base64");

  return [`session=${base64}`];
};

export const createTicket = async (title: string, price: number) => {
  const ticket = Ticket.createNew({
    id: new mongoose.Types.ObjectId().toHexString(),
    title,
    price,
  });

  return await ticket.save();
};

export const createOrder = async (user: string[], ticketId: number) => {
  return await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticketId })
    .expect(201);
};
