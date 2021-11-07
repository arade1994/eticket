import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { currentUser, errorHandler, NotFoundError } from "@radetickets/shared";

import { getOrdersRouter } from "./routes/getAll";
import { getOrderRouter } from "./routes/getOne";
import { createOrderRouter } from "./routes/create";
import { deleteOrderRouter } from "./routes/delete";

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

app.use(getOrdersRouter);
app.use(getOrderRouter);
app.use(createOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
