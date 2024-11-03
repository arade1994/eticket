import { OrderCreatedEvent, Publisher, Subjects } from "@radetickets/factory";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
