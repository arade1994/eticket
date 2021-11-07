import request from "supertest";
import { app } from "../../app";

it("Returns a status 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("Returns a status 400 with incorrect email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testcom",
      password: "password",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testtestcom",
      password: "sf",
    })
    .expect(400);
});

it("Returns a status 400 on empty credentials", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("Disallows duplicated emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("Returns cookie with response", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
