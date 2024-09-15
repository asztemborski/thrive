import { v4 as uuid } from "uuid";
import { isEmpty } from "@packages/nest-utilities";

export abstract class DomainEvent {
  readonly id: string;

  protected constructor() {
    this.id = uuid();
  }
}
