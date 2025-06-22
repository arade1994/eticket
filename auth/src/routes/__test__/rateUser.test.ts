import request from "supertest";

import { app } from "../../app";

describe("Api which rates user", () => {
  test("Returns status 401 when user is not authenticated", async () => {
    await request(app)
      .post("/api/users/rate")
      .send({
        rate: 5,
        comment: "Best rate ever!!!",
        userId: "userId",
        ratedUserId: "ratedUserId",
      })
      .expect(401);
  });

  test("Returns 400 when some of the data is missing", async () => {
    const cookie = await globalThis.signup();

    await request(app)
      .post("/api/users/rate")
      .set("Cookie", cookie)
      .send({ rate: 5, comment: "Best rate ever!!!", userId: "userId" })
      .expect(400);

    await request(app)
      .post("/api/users/rate")
      .set("Cookie", cookie)
      .send({
        comment: "Best rate ever!!!",
        userId: "userId",
        ratedUserId: "ratedUserId",
      })
      .expect(400);

    await request(app)
      .post("/api/users/rate")
      .set("Cookie", cookie)
      .send({ rate: 5, userId: "userId", ratedUserId: "ratedUserId" })
      .expect(400);

    await request(app)
      .post("/api/users/rate")
      .set("Cookie", cookie)
      .send({
        rate: 5,
        comment: "Best rate ever!!!",
        ratedUserId: "ratedUserId",
      })
      .expect(400);
  });

  test("Successfully saves a rate with comment for a user", async () => {
    const cookie = await globalThis.signup();

    await request(app)
      .post("/api/users/rate")
      .set("Cookie", cookie)
      .send({
        rate: 5,
        comment: "Best rate ever!!!",
        userId: "userId",
        ratedUserId: "ratedUserId",
      })
      .expect(201);
  });
});
