import { Request, Response, NextFunction } from "express";

import { CustomError } from "@errors/CustomError";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);

  res.status(400).send({ errors: [{ message: "Something went wrong" }] });
};
