import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import request from "supertest";

import { app } from "../app";

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

export const createTicket = (
  title: string,
  price: number,
  category: string
) => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price, category })
    .expect(201);
};
