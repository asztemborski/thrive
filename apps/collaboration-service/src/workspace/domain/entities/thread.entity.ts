import { EntityBase } from '@packages/nest-ddd';

export type ThreadProperties = {
  name: string;
  workspaceId: string;
};

export class Thread extends EntityBase {
  private readonly _name: string;
  private _workspaceId: string;

  constructor({ name, workspaceId }: ThreadProperties) {
    super(crypto.randomUUID());
    this._name = name;
    this._workspaceId = workspaceId;
  }

  get workspaceId(): string {
    return this._workspaceId;
  }

  get name(): string {
    return this._name;
  }

  private set workspaceId(value: string) {
    this._workspaceId = value;
  }
}
