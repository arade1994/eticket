import { Publisher, Subjects, type TicketUpdatedEvent } from "@radetickets/factory";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
