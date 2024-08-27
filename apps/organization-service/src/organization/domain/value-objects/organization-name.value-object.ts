import { DomainPrimitive, ValueObject } from '@packages/nest-ddd';
import { OrganizationMaxLengthException } from '../exceptions';

const ORGANIZATION_MAX_LENGTH = 20;

export class OrganizationName extends ValueObject<string> {
  protected override validate({ value }: DomainPrimitive<string>): void {
    if (value.length > ORGANIZATION_MAX_LENGTH) {
      throw new OrganizationMaxLengthException(ORGANIZATION_MAX_LENGTH);
    }
  }

  get value(): string {
    return this.properties.value;
  }
}
