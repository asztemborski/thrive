export abstract class DomainEvent {
  readonly id: string;

  protected constructor() {
    this.id = crypto.randomUUID();
  }
}
