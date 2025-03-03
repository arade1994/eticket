import { describe, expect, test } from "vitest";
import { filterOrders } from "./orders";
import mockDb from "../mock/db.json";
import { Order } from "../types/order";

const mockOrders = mockDb.orders as unknown as Order[];

describe("filterOrders()", () => {
  test("it should return empty array when list of orders is empty", () => {
    expect(filterOrders([], "", "-", "-")).toEqual([]);
  });

  test("it should return empty array when there are no orders matching to the ticket title", () => {
    expect(filterOrders(mockOrders, "xyz", "-", "-")).toEqual([]);
  });

  test("it should return filtered orders which ticket title matches the filter", () => {
    expect(filterOrders(mockOrders, "Foot", "-", "-")).toMatchInlineSnapshot(`
      [
        {
          "expiresAt": 1740163067109,
          "id": "5ccb",
          "status": "created",
          "ticket": {
            "category": "sport game",
            "id": "1c8a",
            "price": "230.00",
            "title": "Football Match",
            "userId": "huw9ufsh9q0fhr0g",
          },
          "ticketId": "1c8a",
          "userId": "sfg4gwg5stgsggw4",
        },
      ]
    `);
  });

  test("it should return empty array when there are no orders matching to the selected user", () => {
    expect(filterOrders(mockOrders, "", "ydgsrgww422g4wgr", "-")).toEqual([]);
  });

  test("it should return filtered orders when we select correct user", () => {
    expect(filterOrders(mockOrders, "", "sfg4gwg5stgsggw4", "-"))
      .toMatchInlineSnapshot(`
      [
        {
          "expiresAt": 1740163067109,
          "id": "5ccb",
          "status": "created",
          "ticket": {
            "category": "sport game",
            "id": "1c8a",
            "price": "230.00",
            "title": "Football Match",
            "userId": "huw9ufsh9q0fhr0g",
          },
          "ticketId": "1c8a",
          "userId": "sfg4gwg5stgsggw4",
        },
        {
          "expiresAt": 1740163070001,
          "id": "6253",
          "status": "created",
          "ticket": {
            "category": "theatre play",
            "id": "0bb2",
            "price": "540.00",
            "title": "Bethoveen Concerto",
            "userId": "ydgsrgww422g4wgr",
          },
          "ticketId": "0bb2",
          "userId": "sfg4gwg5stgsggw4",
        },
        {
          "expiresAt": 1740163072553,
          "id": "5c7c",
          "status": "created",
          "ticket": {
            "category": "music event",
            "id": "3a4f",
            "price": "120.00",
            "title": "Concert",
            "userId": "eaegsgsg4sghds5g",
          },
          "ticketId": "3a4f",
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
          "id": "5ccb",
          "status": "created",
          "ticket": {
            "category": "sport game",
            "id": "1c8a",
            "price": "230.00",
            "title": "Football Match",
            "userId": "huw9ufsh9q0fhr0g",
          },
          "ticketId": "1c8a",
          "userId": "sfg4gwg5stgsggw4",
        },
        {
          "expiresAt": 1740163070001,
          "id": "6253",
          "status": "created",
          "ticket": {
            "category": "theatre play",
            "id": "0bb2",
            "price": "540.00",
            "title": "Bethoveen Concerto",
            "userId": "ydgsrgww422g4wgr",
          },
          "ticketId": "0bb2",
          "userId": "sfg4gwg5stgsggw4",
        },
        {
          "expiresAt": 1740163072553,
          "id": "5c7c",
          "status": "created",
          "ticket": {
            "category": "music event",
            "id": "3a4f",
            "price": "120.00",
            "title": "Concert",
            "userId": "eaegsgsg4sghds5g",
          },
          "ticketId": "3a4f",
          "userId": "sfg4gwg5stgsggw4",
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
      filterOrders(mockOrders, "Foot", "sfg4gwg5stgsggw4", "created")
    ).toMatchInlineSnapshot(`
      [
        {
          "expiresAt": 1740163067109,
          "id": "5ccb",
          "status": "created",
          "ticket": {
            "category": "sport game",
            "id": "1c8a",
            "price": "230.00",
            "title": "Football Match",
            "userId": "huw9ufsh9q0fhr0g",
          },
          "ticketId": "1c8a",
          "userId": "sfg4gwg5stgsggw4",
        },
      ]
    `);
  });
});
