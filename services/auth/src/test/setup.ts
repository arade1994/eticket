import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { signup } from "./utils";

jest.setTimeout(20_000);

let mongo: MongoMemoryServer;
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
