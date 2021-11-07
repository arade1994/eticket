import { PaymentCreatedEvent, Publisher, Subjects } from "@radetickets/shared";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
