// script: hashing function, callback based, we wanna async await
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// trun scrypt into a promise based implementation
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    // Salting is the act of adding a series of random characters to a password before going through the hashing function.
    const salt = randomBytes(8).toString("hex");
    // hashing function
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    // password: salt + the password encoded.
    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    // supplied password needs to be equal to hashed password.
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
