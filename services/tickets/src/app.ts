import { json } from "body-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { currentUser, errorHandler, NotFoundError } from "@radetickets/factory";

import { createTicketRouter } from "./routes/create";
import { getTicketsRouter } from "./routes/getAll";
import { getTicketRouter } from "./routes/getOne";
import { updateRouter } from "./routes/update";

import "dotenv/config";

const app = express();

app.set("trust proxy", true);
app.use(
  cors({
    origin: "http://app.eticket.local:3000",
    credentials: true,
  })
);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    domain:
      process.env.NODE_ENV === "development" ? ".eticket.local" : undefined,
  })
);
app.use(json());
app.use(currentUser);

app.use(createTicketRouter);
app.use(getTicketRouter);
app.use(getTicketsRouter);
app.use(updateRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export { app };
