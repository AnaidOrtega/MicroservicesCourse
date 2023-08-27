import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email Must Be Valid."),
    body("password").trim().notEmpty().withMessage("Must supply a password."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // check if the user is existent
    const existingUser = await User.findOne({ email });
    //throw error it not
    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }
    // check if the passwords match
    const passwordsMatch = await Password.compare(existingUser.password, password);
    // throw error if not
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }
    // generate jwt
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );
    //store it on session object
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
