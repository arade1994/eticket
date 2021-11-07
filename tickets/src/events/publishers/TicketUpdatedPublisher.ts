import { Publisher, Subjects, TicketUpdatedEvent } from "@radetickets/shared";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
