import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting database";

  constructor() {
    super("Error connecting database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
