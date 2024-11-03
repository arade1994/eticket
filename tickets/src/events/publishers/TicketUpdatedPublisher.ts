import { Publisher, Subjects, TicketUpdatedEvent } from "@radetickets/factory";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
