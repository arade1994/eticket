import { OrderCancelledEvent, Publisher, Subjects } from "@radetickets/shared";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
