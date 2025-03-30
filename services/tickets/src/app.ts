import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { currentUser, errorHandler, NotFoundError } from "@radetickets/factory";

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export { app };
