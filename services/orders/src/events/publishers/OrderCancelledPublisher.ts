import { type OrderCancelledEvent, Publisher, Subjects } from "@radetickets/factory";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
