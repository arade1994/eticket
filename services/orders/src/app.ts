import { json } from "body-parser";
import cookieSession from "cookie-session";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { currentUser, errorHandler, NotFoundError } from "@radetickets/factory";

import { createOrderRouter } from "./routes/create";
import { deleteOrderRouter } from "./routes/delete";
import { getOrdersRouter } from "./routes/getAll";
import { getOrderRouter } from "./routes/getOne";

import "dotenv/config";

const app = express();

app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(json());

app.use(currentUser);

app.use(getOrdersRouter);
app.use(getOrderRouter);
app.use(createOrderRouter);
app.use(deleteOrderRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export { app };
