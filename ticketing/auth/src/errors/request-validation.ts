import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 500;

  constructor(public errors: ValidationError[]) {
    super("Invalid Credentials.");
    // ONLY BECAUSE WE ARE EXTENDING A BUILT IN CLASS
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.param,
    }));
  }
}
