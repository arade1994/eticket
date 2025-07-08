import { json } from "body-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { errorHandler, NotFoundError } from "@radetickets/factory";

import { currentUserRouter } from "./routes/currentUser";
import { rateUserRouter } from "./routes/rateUser";
import { ratingsRouter } from "./routes/ratings";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signOut";
import { signUpRouter } from "./routes/signUp";
import { usersRouter } from "./routes/users";

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

app.use(signUpRouter);
app.use(signInRouter);
app.use(currentUserRouter);
app.use(signOutRouter);
app.use(usersRouter);
app.use(rateUserRouter);
app.use(ratingsRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export { app };
