import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { errorHandler, NotFoundError } from "@radetickets/shared";

import { currentUserRouter } from "./routes/currentUser";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signOut";
import { signUpRouter } from "./routes/signUp";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(signUpRouter);
app.use(signInRouter);
app.use(currentUserRouter);
app.use(signOutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
