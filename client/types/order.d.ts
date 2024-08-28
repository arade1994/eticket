import { type Ticket } from "./ticket";

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  expiresAt: string;
  version: number;
  ticket: Ticket;
}

export declare enum OrderStatus {
  Created = "created",
  Cancelled = "cancelled",
  AwaitingPayment = "awaiting:payment",
  Complete = "complete",
}
