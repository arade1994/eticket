import {
  type ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@radetickets/factory";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
