import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import path from "path";

import { signin } from "./utils";

dotenv.config({ path: path.join(process.cwd(), ".env.test") });

jest.mock("../natsWrapper.ts");

let mongo: MongoMemoryServer;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoURI = await mongo.getUri();

  await mongoose.connect(mongoURI, {});
});

beforeEach(async () => {
  jest.clearAllMocks();

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

globalThis.signin = signin;
