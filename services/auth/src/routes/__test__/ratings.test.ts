import request from "supertest";

import { app } from "../../app";

describe("Api which returns list of ratings", () => {
  test("Returns status 401 when user is not authenticated", async () => {
    await request(app).get("/api/users/ratings").expect(401);
  });

  test("Returns list of all ratings from the database", async () => {
    const cookie = await globalThis.signup();

    await request(app)
      .post("/api/users/rate")
      .set("Cookie", cookie)
      .send({
        rate: 5,
        comment: "Best rate ever!!!",
        userId: "firstUserId",
        ratedUserId: "firstRatedUserId",
      })
      .expect(201);

    await request(app)
      .post("/api/users/rate")
      .set("Cookie", cookie)
      .send({
        rate: 4,
        comment: "Very good rate!",
        userId: "secondUserId",
        ratedUserId: "secondRatedUserId",
      })
      .expect(201);

    const response = await request(app)
      .get("/api/users/ratings")
      .set("Cookie", cookie)
      .expect(200);

    const ratings = response.body;
    expect(ratings.length).toEqual(2);
    expect(ratings[0].userId).toEqual("firstUserId");
    expect(ratings[1].ratedUserId).toEqual("secondRatedUserId");
  });
});
