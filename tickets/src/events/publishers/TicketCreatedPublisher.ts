import { Publisher, Subjects, TicketCreatedEvent } from "@radetickets/factory";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
