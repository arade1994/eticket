import request from "supertest";

import { app } from "../../app";

describe("Api which returns all registered users", () => {
  test("Returns 401 when user is no authenticated", async () => {
    await request(app).get("/api/users").expect(401);
  });

  test("Returns list of all registered users", async () => {
    const cookie = await globalThis.signup();

    await request(app)
      .post("/api/users/signup")
      .send({
        firstName: "Johnny",
        lastName: "Bravo",
        age: 20,
        email: "bravo@test.com",
        password: "bravo15",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signup")
      .send({
        firstName: "Marc",
        lastName: "Mitral",
        age: 50,
        email: "mitra@test.com",
        password: "marc01",
      })
      .expect(201);

    const response = await request(app)
      .get("/api/users")
      .set("Cookie", cookie)
      .expect(200);

    const users = response.body;
    expect(users.length).toEqual(3);
    expect(users[1].firstName).toEqual("Johnny");
    expect(users[2].age).toEqual(50);
  });
});
