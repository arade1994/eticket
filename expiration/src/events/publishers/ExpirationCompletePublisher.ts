import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@radetickets/shared";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
