import request from "supertest";
import { app } from "../../app";

describe("Api which registers user", () => {
  test("Returns a status 201 on successfull signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        firstName: "Mark",
        lastName: "Bravo",
        age: 25,
        email: "bravus@test.com",
        password: "password",
      })
      .expect(201);
  });

  test("Returns a status 400 with incorrect login data", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        firstName: "Maria",
        lastName: "Hernandez",
        age: 20,
        email: "maria.herna@testcom",
        password: "maria111",
      })
      .expect(400);

    await request(app)
      .post("/api/users/signup")
      .send({
        firstName: "Marcus",
        lastName: "Mitral",
        age: 20,
        email: "mitralcus@test.com",
        password: "",
      })
      .expect(400);

    await request(app)
      .post("/api/users/signup")
      .send({
        firstName: "Staphany",
        lastName: "Bolton",
        age: 20,
        email: "stephtestcom",
        password: "sf",
      })
      .expect(400);
  });

  test("Returns a status 400 on empty credentials", async () => {
    return request(app).post("/api/users/signup").send({}).expect(400);
  });

  test("Disallows duplicated emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        firstName: "Mario",
        lastName: "Pierloni",
        age: 20,
        email: "pierlo@test.com",
        password: "mario222",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signup")
      .send({
        firstName: "Marco",
        lastName: "Pirlo",
        age: 20,
        email: "pierlo@test.com",
        password: "pirlo000",
      })
      .expect(400);
  });

  test("Returns cookie with response", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        firstName: "Johnny",
        lastName: "Bravo",
        age: 20,
        email: "bravo@test.com",
        password: "bravo15",
      })
      .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
