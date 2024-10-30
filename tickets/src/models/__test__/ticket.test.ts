import { Ticket } from "../Ticket";

describe("Ticket model", () => {
  test("Implements a optimistic concurrency control", async () => {
    const ticket = Ticket.createNew({
      title: "Basketball Game",
      price: 320,
      userId: "userId",
      category: "Sport Event",
    });

    await ticket.save();

    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    firstInstance?.set({ price: 320 });
    secondInstance?.set({ price: 350 });

    await firstInstance?.save();

    let error;

    try {
      await secondInstance?.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
  });

  test("Increments the version of ticket on every update", async () => {
    const ticket = Ticket.createNew({
      title: "Yankees Game",
      price: 300,
      userId: "userId",
      category: "Sport Game",
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
  });
});
