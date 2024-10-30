import request from "supertest";

import { app } from "../app";

export const signup = async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      firstName: "Test",
      lastName: "Test",
      age: 25,
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const cookie = authResponse.get("Set-Cookie");

  return cookie;
};
