import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const signin = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  const base64 = Buffer.from(
    JSON.stringify({ jwt: jwt.sign(payload, process.env.JWT_KEY!) })
  ).toString("base64");

  return [`session=${base64}`];
};
