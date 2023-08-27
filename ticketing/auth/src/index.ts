import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();

// trust prom proxy
app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    // disable encryption, only JWT is encrypted
    signed: false,
    // user can only use the cookie in https connection
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// CONNECTO TO THE MONGO DB INSTANCE
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to DB c: 💚");
  } catch (error) {
    console.log("ERROR: ", error);
  }
  app.listen(3000, () => {
    console.log("Listening on Port 3000 💕");
  });
};

start();
