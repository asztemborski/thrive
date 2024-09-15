import { ValueObject } from '@packages/nest-ddd';

type OwnerProperties = {
  id: string;
  name: string;
};

export class Owner extends ValueObject<OwnerProperties> {
  protected override validate(props: OwnerProperties): void {}

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }
}
