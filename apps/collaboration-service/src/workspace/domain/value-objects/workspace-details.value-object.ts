import { ValueObject } from '@packages/nest-ddd';
import { WorkspaceMaxLengthException } from '../exceptions';

export type WorkspaceDetailsProperties = {
  name: string;
  description: string;
};

export const WORKSPACE_NAME_MAX_LENGTH = 20;
export const WORKSPACE_DESCRIPTION_MAX_LENGTH = 200;

export class WorkspaceDetails extends ValueObject<WorkspaceDetailsProperties> {
  protected override validate({ name, description }: WorkspaceDetailsProperties): void {
    if (name.length > WORKSPACE_NAME_MAX_LENGTH) {
      throw new WorkspaceMaxLengthException(WORKSPACE_NAME_MAX_LENGTH);
    }

    if (description.length > WORKSPACE_DESCRIPTION_MAX_LENGTH) {
      throw new Error('Description length');
    }
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }
}
