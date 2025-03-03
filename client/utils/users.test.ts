import { describe, expect, test } from "vitest";

import mockDb from "../mock/db.json";
import { type Ticket } from "../types/ticket";
import { type Rating, type User } from "../types/user";

import {
  filterUsers,
  getIsUserRated,
  getNumOfCreatedTickets,
  getUserRating,
  getUserRatings,
} from "./users";

const mockUsers = mockDb.users as unknown as User[];
const mockTickets = mockDb.tickets as unknown as Ticket[];
const mockRatings = mockDb.ratings as unknown as Rating[];

describe("getNumOfCreatedTickets()", () => {
  test("it should return zero when user didn't create any ticket", () => {
    expect(getNumOfCreatedTickets(mockUsers[1].id, mockTickets)).toEqual(0);
  });

  test("it should return the number of created tickets per user", () => {
    expect(getNumOfCreatedTickets(mockUsers[0].id, mockTickets)).toEqual(1);
  });
});

describe("getUserRatings()", () => {
  test("it should return empty array when user doesn't have any ratings", () => {
    expect(getUserRatings("eaegsgsg4sghds5g", mockRatings)).toEqual([]);
  });

  test("it should return all ratings for a user", () => {
    expect(getUserRatings("huw9ufsh9q0fhr0g", mockRatings))
      .toMatchInlineSnapshot(`
      [
        {
          "comment": "Proven user, everything on time and very precise",
          "id": "2a37",
          "rate": 5,
          "ratedUserId": "huw9ufsh9q0fhr0g",
          "userId": "sfg4gwg5stgsggw4",
        },
        {
          "comment": "Always provides tickets for interesting events, with a acceptable cost. Must recommend",
          "id": "2341",
          "rate": 5,
          "ratedUserId": "huw9ufsh9q0fhr0g",
          "userId": "ydgsrgww422g4wgr",
        },
        {
          "comment": "Good and with a great tickets always, but, very busy and hard to reach. In general, still would recommend😀",
          "id": "5g3d",
          "rate": 4,
          "ratedUserId": "huw9ufsh9q0fhr0g",
          "userId": "hhrgrs9g04hsghhr",
        },
      ]
    `);
  });
});

describe("getUserRating()", () => {
  test("it should return dash if user doesn't have any ratings", () => {
    expect(getUserRating("eaegsgsg4sghds5g", mockRatings)).toEqual("-");
  });

  test("it should return calculated rating number for a user", () => {
    expect(getUserRating("huw9ufsh9q0fhr0g", mockRatings)).toEqual("4.7");
  });
});

describe("getIsUserRated()", () => {
  test("it should return false when user is not rated by the currently logged in user", () => {
    expect(
      getIsUserRated("hhrgrs9g04hsghhr", mockRatings, "sfg4gwg5stgsggw4")
    ).toBeFalsy();
  });

  test("it should return true when user is rated by currently logged in user", () => {
    expect(
      getIsUserRated("huw9ufsh9q0fhr0g", mockRatings, "sfg4gwg5stgsggw4")
    ).toBeTruthy();
  });
});

describe("filterUsers()", () => {
  test("it should return empty array when there are no users passed", () => {
    expect(filterUsers([], "-")).toEqual([]);
  });

  test("it should return empty array when there are no users which first or last name matches filter", () => {
    expect(filterUsers(mockUsers, "Test")).toEqual([]);
  });

  test("it should return filtered users by the first name", () => {
    expect(filterUsers(mockUsers, "marc")).toMatchInlineSnapshot(`
      [
        {
          "age": 23,
          "email": "marcusmill@gmail.com",
          "firstName": "Marcus",
          "id": "huw9ufsh9q0fhr0g",
          "lastName": "Millford",
          "password": "marcus123",
        },
      ]
    `);
  });

  test("it should return filtered users by the last name", () => {
    expect(filterUsers(mockUsers, "mile")).toMatchInlineSnapshot(`
      [
        {
          "age": 45,
          "email": "mili45@gmail.com",
          "firstName": "Marin",
          "id": "eaegsgsg4sghds5g",
          "lastName": "Miletić",
          "password": "mili123",
        },
      ]
    `);
  });
});
