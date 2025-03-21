import { type IncomingMessage } from "http";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}

export interface Rating {
  id: string;
  comment: string;
  rate: number;
  userId: string;
  ratedUserId: string;
}

export interface RequestWithUser extends IncomingMessage {
  currentUser?: { id: string; email: string };
}
