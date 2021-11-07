import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/TicketCreatedPublisher";

console.clear();

const stan = nats.connect("eticket", "abc", { url: "http://localhost:4222" });

stan.on("connect", async () => {
  console.log("Publisher connected to NATS Streaming Server");

  const publisher = new TicketCreatedPublisher(stan);
  await publisher.publish({
    id: "1",
    title: "concert",
    price: 30,
  });
});
