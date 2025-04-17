import request from "supertest";

import { app } from "../../app";

describe("Api which gives us information about currently loged in user", () => {
  test("Returns some data about authenticated user", async () => {
    const cookie = await globalThis.signup();

    console.log({ cookie });

    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.firstName).toEqual("Test");
    expect(response.body.currentUser.lastName).toEqual("Test");
    expect(response.body.currentUser.age).toEqual(25);
    expect(response.body.currentUser.email).toEqual("test@test.com");
  });

  test("Responds with null on non-authenticated user", async () => {
    const response = await request(app)
      .get("/api/users/currentuser")
      .send()
      .expect(401);

    expect(response.body.currentUser).toBeUndefined();
  });
});
