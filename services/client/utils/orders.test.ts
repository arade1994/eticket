import { describe, expect, test } from "vitest";

import mockDb from "../mock/db.json";
import { type Order } from "../types/order";

import { filterOrders } from "./orders";

const mockOrders = mockDb.orders as unknown as Order[];

describe("filterOrders()", () => {
  test("it should return empty array when list of orders is empty", () => {
    expect(filterOrders([], "", "-", "-")).toEqual([]);
  });

  test("it should return empty array when there are no orders matching to the ticket title", () => {
    expect(filterOrders(mockOrders, "xyz", "-", "-")).toEqual([]);
  });

  test("it should return filtered orders which ticket title matches the filter", () => {
    expect(filterOrders(mockOrders, "Fin", "-", "-")).toMatchInlineSnapshot(
      `
      [
        {
          "expiresAt": 1740163070001,
          "id": "o2",
          "status": "created",
          "ticket": {
            "category": "sport game",
            "id": "t4",
            "price": "320.00",
            "title": "Champions League Final",
            "userId": "eaegsgsg4sghds5g",
          },
          "ticketId": "t4",
          "userId": "huw9ufsh9q0fhr0g",
        },
        {
          "expiresAt": 1740163092500,
          "id": "o11",
          "status": "created",
          "ticket": {
            "category": "sport game",
            "id": "t22",
            "price": "280.00",
            "title": "Wimbledon Finals",
            "userId": "def456ghi789",
          },
          "ticketId": "t22",
          "userId": "pqr678stu901",
        },
      ]
    `
    );
  });

  test("it should return empty array when there are no orders matching to the selected user", () => {
    expect(filterOrders(mockOrders, "", "ydgsrgwsw422g4wgr", "-")).toEqual([]);
  });

  test("it should return filtered orders when we select correct user", () => {
    expect(filterOrders(mockOrders, "", "sfg4gwg5stgsggw4", "-"))
      .toMatchInlineSnapshot(`
        [
          {
            "expiresAt": 1740163067109,
            "id": "o1",
            "status": "created",
            "ticket": {
              "category": "music event",
              "id": "t2",
              "price": "280.00",
              "title": "Taylor Swift Eras Tour",
              "userId": "huw9ufsh9q0fhr0g",
            },
            "ticketId": "t2",
            "userId": "sfg4gwg5stgsggw4",
          },
        ]
      `);
  });

  test("it should return empty array when status is not matching any order", () => {
    expect(filterOrders(mockOrders, "", "-", "cancelled")).toEqual([]);
  });

  test("it should filter orders according to the selected status", () => {
    expect(filterOrders(mockOrders, "", "-", "created")).toMatchInlineSnapshot(`
      [
        {
          "expiresAt": 1740163067109,
          "id": "o1",
          "status": "created",
          "ticket": {
            "category": "music event",
            "id": "t2",
            "price": "280.00",
            "title": "Taylor Swift Eras Tour",
            "userId": "huw9ufsh9q0fhr0g",
          },
          "ticketId": "t2",
          "userId": "sfg4gwg5stgsggw4",
        },
        {
          "expiresAt": 1740163070001,
          "id": "o2",
          "status": "created",
          "ticket": {
            "category": "sport game",
            "id": "t4",
            "price": "320.00",
            "title": "Champions League Final",
            "userId": "eaegsgsg4sghds5g",
          },
          "ticketId": "t4",
          "userId": "huw9ufsh9q0fhr0g",
        },
        {
          "expiresAt": 1740163072553,
          "id": "o3",
          "status": "created",
          "ticket": {
            "category": "theatre play",
            "id": "t6",
            "price": "120.00",
            "title": "The Lion King",
            "userId": "abc123def456",
          },
          "ticketId": "t6",
          "userId": "hhrgrs9g04hsghhr",
        },
        {
          "expiresAt": 1740163075000,
          "id": "o4",
          "status": "created",
          "ticket": {
            "category": "music event",
            "id": "t8",
            "price": "200.00",
            "title": "Coldplay World Tour",
            "userId": "ghi789jkl012",
          },
          "ticketId": "t8",
          "userId": "eaegsgsg4sghds5g",
        },
        {
          "expiresAt": 1740163077500,
          "id": "o5",
          "status": "created",
          "ticket": {
            "category": "sport game",
            "id": "t10",
            "price": "800.00",
            "title": "Super Bowl LVIII",
            "userId": "mno345pqr678",
          },
          "ticketId": "t10",
          "userId": "ydgsrgww422g4wgr",
        },
        {
          "expiresAt": 1740163080000,
          "id": "o6",
          "status": "created",
          "ticket": {
            "category": "theatre play",
            "id": "t12",
            "price": "140.00",
            "title": "Phantom of the Opera",
            "userId": "stu901vwx234",
          },
          "ticketId": "t12",
          "userId": "abc123def456",
        },
        {
          "expiresAt": 1740163082500,
          "id": "o7",
          "status": "created",
          "ticket": {
            "category": "music event",
            "id": "t14",
            "price": "250.00",
            "title": "Drake It's All A Blur Tour",
            "userId": "yz567abc890",
          },
          "ticketId": "t14",
          "userId": "def456ghi789",
        },
        {
          "expiresAt": 1740163085000,
          "id": "o8",
          "status": "created",
          "ticket": {
            "category": "sport game",
            "id": "t16",
            "price": "380.00",
            "title": "NBA All-Star Game",
            "userId": "sfg4gwg5stgsggw4",
          },
          "ticketId": "t16",
          "userId": "ghi789jkl012",
        },
        {
          "expiresAt": 1740163087500,
          "id": "o9",
          "status": "created",
          "ticket": {
            "category": "theatre play",
            "id": "t18",
            "price": "170.00",
            "title": "Book of Mormon",
            "userId": "hhrgrs9g04hsghhr",
          },
          "ticketId": "t18",
          "userId": "jkl012mno345",
        },
        {
          "expiresAt": 1740163090000,
          "id": "o10",
          "status": "created",
          "ticket": {
            "category": "music event",
            "id": "t20",
            "price": "220.00",
            "title": "Post Malone Tour",
            "userId": "ydgsrgww422g4wgr",
          },
          "ticketId": "t20",
          "userId": "mno345pqr678",
        },
        {
          "expiresAt": 1740163092500,
          "id": "o11",
          "status": "created",
          "ticket": {
            "category": "sport game",
            "id": "t22",
            "price": "280.00",
            "title": "Wimbledon Finals",
            "userId": "def456ghi789",
          },
          "ticketId": "t22",
          "userId": "pqr678stu901",
        },
        {
          "expiresAt": 1740163095000,
          "id": "o12",
          "status": "created",
          "ticket": {
            "category": "theatre play",
            "id": "t24",
            "price": "150.00",
            "title": "Mamma Mia!",
            "userId": "jkl012mno345",
          },
          "ticketId": "t24",
          "userId": "stu901vwx234",
        },
        {
          "expiresAt": 1740163097500,
          "id": "o13",
          "status": "created",
          "ticket": {
            "category": "music event",
            "id": "t26",
            "price": "290.00",
            "title": "Bruno Mars Las Vegas",
            "userId": "pqr678stu901",
          },
          "ticketId": "t26",
          "userId": "vwx234yz567",
        },
      ]
    `);
  });

  test("it should return empty array when filters doesn't match any order", () => {
    expect(
      filterOrders(mockOrders, "Bas", "eaegsgsg4sghds5g", "created")
    ).toEqual([]);
  });

  test("it should return filtered orders when filters are matching", () => {
    expect(
      filterOrders(mockOrders, "Post", "mno345pqr678", "created")
    ).toMatchInlineSnapshot(`
      [
        {
          "expiresAt": 1740163090000,
          "id": "o10",
          "status": "created",
          "ticket": {
            "category": "music event",
            "id": "t20",
            "price": "220.00",
            "title": "Post Malone Tour",
            "userId": "ydgsrgww422g4wgr",
          },
          "ticketId": "t20",
          "userId": "mno345pqr678",
        },
      ]
    `);
  });
});
