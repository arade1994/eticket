import { describe, expect, test } from "vitest";

import mockDb from "../mock/db.json";
import { type Ticket } from "../types/ticket";

import { filterTickets } from "./tickets";

const mockTickets = mockDb.tickets as unknown as Ticket[];

describe("filterTickets()", () => {
  test("it should return empty array when list of tickets is empty", () => {
    expect(filterTickets([], "", "-", "-")).toEqual([]);
  });

  test("it should return empty array when there are no tickets matching the title filter", () => {
    expect(filterTickets(mockTickets, "scgd", "-", "-")).toEqual([]);
  });

  test("it should filter tickets according to the title filter", () => {
    expect(filterTickets(mockTickets, "Weeknd", "-", "-"))
      .toMatchInlineSnapshot(`
      [
        {
          "category": "music event",
          "id": "t23",
          "price": "240.00",
          "title": "The Weeknd Tour",
          "userId": "ghi789jkl012",
        },
      ]
    `);
  });

  test("it should return empty array when there are no tickets matching the category filter", () => {
    expect(filterTickets(mockTickets, "", "public transport", "-")).toEqual([]);
  });

  test("it should filter tickets according to the category filter", () => {
    expect(filterTickets(mockTickets, "", "music event", "-"))
      .toMatchInlineSnapshot(`
        [
          {
            "category": "music event",
            "id": "t2",
            "price": "280.00",
            "title": "Taylor Swift Eras Tour",
            "userId": "huw9ufsh9q0fhr0g",
          },
          {
            "category": "music event",
            "id": "t5",
            "price": "150.00",
            "title": "Ed Sheeran Concert",
            "userId": "ydgsrgww422g4wgr",
          },
          {
            "category": "music event",
            "id": "t8",
            "price": "200.00",
            "title": "Coldplay World Tour",
            "userId": "ghi789jkl012",
          },
          {
            "category": "music event",
            "id": "t11",
            "price": "300.00",
            "title": "Beyoncé Renaissance Tour",
            "userId": "pqr678stu901",
          },
          {
            "category": "music event",
            "id": "t14",
            "price": "250.00",
            "title": "Drake It's All A Blur Tour",
            "userId": "yz567abc890",
          },
          {
            "category": "music event",
            "id": "t17",
            "price": "500.00",
            "title": "Adele Las Vegas Residency",
            "userId": "huw9ufsh9q0fhr0g",
          },
          {
            "category": "music event",
            "id": "t20",
            "price": "220.00",
            "title": "Post Malone Tour",
            "userId": "ydgsrgww422g4wgr",
          },
          {
            "category": "music event",
            "id": "t23",
            "price": "240.00",
            "title": "The Weeknd Tour",
            "userId": "ghi789jkl012",
          },
          {
            "category": "music event",
            "id": "t26",
            "price": "290.00",
            "title": "Bruno Mars Las Vegas",
            "userId": "pqr678stu901",
          },
          {
            "category": "music event",
            "id": "t29",
            "price": "320.00",
            "title": "Lady Gaga Las Vegas",
            "userId": "yz567abc890",
          },
        ]
      `);
  });

  test("it should return empty array when there are no tickets matching the user filter", () => {
    expect(filterTickets(mockTickets, "", "-", "hhrgrs9gs04hsghhr")).toEqual(
      []
    );
  });

  test("it should return filtered tickets according to the user filter", () => {
    expect(filterTickets(mockTickets, "", "-", "eaegsgsg4sghds5g"))
      .toMatchInlineSnapshot(`
        [
          {
            "category": "sport game",
            "id": "t4",
            "price": "320.00",
            "title": "Champions League Final",
            "userId": "eaegsgsg4sghds5g",
          },
          {
            "category": "sport game",
            "id": "t19",
            "price": "420.00",
            "title": "Formula 1 Grand Prix",
            "userId": "eaegsgsg4sghds5g",
          },
        ]
      `);
  });

  test("it should return empty array when there are no tickets matching selected filters", () => {
    expect(
      filterTickets(mockTickets, "Foot", "music event", "huw9ufsh9q0fhr0g")
    ).toEqual([]);
  });

  test("it should return filtered tickets when there are tickets that matches selected filters", () => {
    expect(
      filterTickets(mockTickets, "Mamma", "theatre play", "jkl012mno345")
    ).toMatchInlineSnapshot(`
      [
        {
          "category": "theatre play",
          "id": "t24",
          "price": "150.00",
          "title": "Mamma Mia!",
          "userId": "jkl012mno345",
        },
      ]
    `);
  });
});
