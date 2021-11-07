import { OrderCreatedEvent, Publisher, Subjects } from "@radetickets/shared";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
