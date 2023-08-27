import mongoose from "mongoose";
import { Password } from "../services/password";

// PROPERTIES TO CREATE A NEW USER
interface UserAttrs {
  email: string;
  password: string;
}

// PROPERTIES FOR USER MODEL
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//PROPERTIES FRO USER DOCUMENT
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// THE TYPING IS NOT RELATED TO TYPESCRIPT, IT IS 100%  FROM MONGOOSE
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// This is a middleware function
// it is executed everytime a document is trying to be saved
// function keyboard important: it allows us to access the current document (the user).
// mongoose does not really suppor async await code, we need to call "done" once the code is finished
userSchema.pre("save", async function (done) {
  // we are only going to hash the password if it has been modified or created
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    // Set field with hashed password
    this.set("password", hashed);
  }
  // necessary!!
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
