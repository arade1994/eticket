import { Ticket } from "../Ticket";

it("Implements a optimistic concurrency control", async (done) => {
  const ticket = Ticket.createNew({
    title: "concert",
    price: 5,
    userId: "224",
  });

  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 15 });

  await firstInstance?.save();

  try {
    await secondInstance?.save();
  } catch (err) {
    return done();
  }

  throw new Error("Error occured when saving second instance!");
});

it("Increments the version of ticket on every update", async () => {
  const ticket = Ticket.createNew({
    title: "concert",
    price: 20,
    userId: "111",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
