import { Publisher } from "./Publisher";
import { Subjects } from "./Subjects";
import { TicketCreatedEvent } from "./TicketCreatedEvent";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
