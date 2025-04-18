import { Publisher, Subjects, type TicketCreatedEvent } from "@radetickets/factory";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
