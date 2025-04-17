import { type PaymentCreatedEvent, Publisher, Subjects } from "@radetickets/factory";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
