import { randomBytes } from "crypto";
import nats from "node-nats-streaming";

import { TicketCreatedListener } from "./events/TicketCreatedListener";

console.clear();

const stan = nats.connect("eticket", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS Streaming Server");

  stan.on("close", () => {
    console.log("NATS connection is closed!");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
