import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { signin } from "./utils";

jest.mock("../natsWrapper.ts");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asafssgdg";

  mongo = await MongoMemoryServer.create();
  const mongoURI = await mongo.getUri();

  await mongoose.connect(mongoURI);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = signin;
