export interface SerializeErrorsResponse {
  message: string;
  field?: string;
}

export abstract class CustomError extends Error {
  // ALL PROPERTIES THAT NEED TO BE DEFINED BY EVERY CLASS THAT EXTENDS THIS.
  abstract statusCode: number;

  constructor(message: string) {
    // CALL THROW ERROR METHOD
    super(message);
    // ONLY BECAUSE WE ARE EXTENDING A BUILT IN CLASS
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): SerializeErrorsResponse[];
}
