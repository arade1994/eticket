import { Publisher, Subjects, TicketCreatedEvent } from "@radetickets/shared";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
