import { Subjects } from "./Subjects";

export interface TicketUpdatedEvent {
  subject: Subjects;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
    orderId?: string;
  };
}