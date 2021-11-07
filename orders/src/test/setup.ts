import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
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

global.signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  const base64 = Buffer.from(
    JSON.stringify({ jwt: jwt.sign(payload, process.env.JWT_KEY!) })
  ).toString("base64");

  return [`express:sess=${base64}`];
};
