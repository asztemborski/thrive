import { DomainPrimitive, ValueObject } from '@packages/nest-ddd';
import { WorkspaceMaxLengthException } from '../exceptions';

const WORKSPACE_MAX_LENGTH = 20;

export class WorkspaceName extends ValueObject<string> {
  protected override validate({ value }: DomainPrimitive<string>): void {
    if (value.length > WORKSPACE_MAX_LENGTH) {
      throw new WorkspaceMaxLengthException(WORKSPACE_MAX_LENGTH);
    }
  }

  get value(): string {
    return this.properties.value;
  }
}
