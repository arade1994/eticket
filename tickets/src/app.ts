import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { currentUser, errorHandler, NotFoundError } from "@radetickets/shared";

import { createTicketRouter } from "./routes/create";
import { getTicketRouter } from "./routes/getOne";
import { getTicketsRouter } from "./routes/getAll";
import { updateRouter } from "./routes/update";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(getTicketRouter);
app.use(getTicketsRouter);
app.use(updateRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
