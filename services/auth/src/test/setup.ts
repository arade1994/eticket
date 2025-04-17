import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import path from "path";

import { signup } from "./utils";

dotenv.config({ path: path.join(process.cwd(), ".env.test") });

jest.setTimeout(20_000);

let mongo: MongoMemoryServer;

console.log("JWT: ", process.env.JWT_KEY);

beforeAll(async () => {
  try {
    mongo = await MongoMemoryServer.create();
    const mongoURI = await mongo.getUri();
    await mongoose.connect(mongoURI);
  } catch (err) {
    console.error("Error in beforeAll:", err);
    throw err;
  }
});

beforeEach(async () => {
  if (!mongoose.connection.db)
    throw new Error("There is no Mongo database initialized!");

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) await mongo.stop();
  await mongoose.connection.close();
});

globalThis.signup = signup;
