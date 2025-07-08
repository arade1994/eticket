import mongoose from "mongoose";

import { PasswordService } from "../utils/Password";

interface UserAttributes {
  firstName: string;
  lastName: string;
  dayOfBirth: number;
  monthOfBirth: number;
  yearOfBirth: number;
  street: string;
  houseNumber: number;
  city: string;
  postalCode: number;
  country: string;
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  dayOfBirth: number;
  monthOfBirth: number;
  yearOfBirth: number;
  street: string;
  houseNumber: number;
  city: string;
  postalCode: number;
  country: string;
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
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
    dayOfBirth: {
      type: Number,
      required: true,
    },
    monthOfBirth: {
      type: Number,
      required: true,
    },
    yearOfBirth: {
      type: Number,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: Number,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
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
    username: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    ratings: {
      type: Array,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
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
