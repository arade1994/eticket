import { describe, expect, test } from "vitest";
import mockDb from "../mock/db.json";
import { Ticket } from "../types/ticket";
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
    expect(filterTickets(mockTickets, "Basket", "-", "-"))
      .toMatchInlineSnapshot(`
      [
        {
          "category": "sport game",
          "id": "2f3b",
          "price": "430.00",
          "title": "Basketball Game",
          "userId": "sfg4gwg5stgsggw4",
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
          "id": "3a4f",
          "price": "120.00",
          "title": "Concert",
          "userId": "eaegsgsg4sghds5g",
        },
      ]
    `);
  });

  test("it should return empty array when there are no tickets matching the user filter", () => {
    expect(filterTickets(mockTickets, "", "-", "hhrgrs9g04hsghhr")).toEqual([]);
  });

  test("it should return filtered tickets according to the user filter", () => {
    expect(filterTickets(mockTickets, "", "-", "eaegsgsg4sghds5g"))
      .toMatchInlineSnapshot(`
      [
        {
          "category": "music event",
          "id": "3a4f",
          "price": "120.00",
          "title": "Concert",
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
      filterTickets(mockTickets, "conc", "music event", "eaegsgsg4sghds5g")
    ).toMatchInlineSnapshot(`
      [
        {
          "category": "music event",
          "id": "3a4f",
          "price": "120.00",
          "title": "Concert",
          "userId": "eaegsgsg4sghds5g",
        },
      ]
    `);
  });
});
