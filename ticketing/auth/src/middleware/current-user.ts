import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// Modify existing interface or add some new properties
// inside out project > express > find the interface called Request
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// it is not an error middleware because it has only 3 parameters
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    // return and pass to the next listed middleware
    return next();
  }
  try {
    // extract information from jwt
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;

    // in case anything goeas wrong
  } catch (error) {}

  // we always want to continue to the next middleware
  next();
};
