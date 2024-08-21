import mongoose from "mongoose";

import { PasswordService } from "../utils/Password";

interface UserAttributes {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  rating?: number;
}

interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  rating?: number;
}

interface UserModel extends mongoose.Model<UserDocument> {
  createNew: (attributes: UserAttributes) => UserDocument;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordService.hash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.createNew = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
