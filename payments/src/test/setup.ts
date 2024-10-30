import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { signin } from "./utils";

process.env.STRIPE_KEY =
  "sk_test_51JrojjLiD4aXIcPweWza0lGCjoIcF3gQwKzhZ6TLzvahU3v3nmI4sJdnOuLQGdf7IcmEMp9aV8MxaZNBWSIfdDvJ00QeKW57vm";

jest.mock("../natsWrapper.ts");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asafssgdg";

  mongo = await MongoMemoryServer.create();
  const mongoURI = await mongo.getUri();

  await mongoose.connect(mongoURI, {});
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
