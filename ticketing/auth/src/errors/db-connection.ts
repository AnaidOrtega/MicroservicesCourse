import { CustomError } from "./custom-error";

export class DBConnectionError extends CustomError {
  statusCode = 500;
  reson = "Error connection to DB.";

  constructor() {
    super("Error Connection to DB...");
    // ONLY BECAUSE WE ARE EXTENDING A BUILT IN CLASS
    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: "Error Connection to the DB." }];
  }
}
