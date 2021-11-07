import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

process.env.STRIPE_KEY =
  "sk_test_51JrojjLiD4aXIcPweWza0lGCjoIcF3gQwKzhZ6TLzvahU3v3nmI4sJdnOuLQGdf7IcmEMp9aV8MxaZNBWSIfdDvJ00QeKW57vm";

declare global {
  var signin: (id?: string) => string[];
}

jest.mock("../natsWrapper.ts");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asafssgdg";

  mongo = new MongoMemoryServer();
  const mongoURI = await mongo.getUri();

  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
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

global.signin = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  const base64 = Buffer.from(
    JSON.stringify({ jwt: jwt.sign(payload, process.env.JWT_KEY!) })
  ).toString("base64");

  return [`express:sess=${base64}`];
};
