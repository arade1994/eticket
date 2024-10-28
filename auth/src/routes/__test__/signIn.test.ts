import request from "supertest";

import { app } from "../../app";

describe("Api which loggs user in", () => {
  test("Fails when unexisting email is supplied", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({ email: "test@test.com", password: "password" })
      .expect(400);
  });

  test("Fails when incorrect password is supplied", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        firstName: "Angus",
        lastName: "Jung",
        age: 29,
        email: "angus@test.com",
        password: "jung235",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signin")
      .send({ email: "angus@test.com", password: "rdygs" })
      .expect(400);
  });

  test("Return cookie in response when successfully authenticated", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        firstName: "John",
        lastName: "Doe",
        age: 18,
        email: "johndoe@test.com",
        password: "doe345",
      })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signin")
      .send({ email: "johndoe@test.com", password: "doe345" })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
