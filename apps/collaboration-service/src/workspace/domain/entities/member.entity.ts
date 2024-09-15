import { EntityBase } from '@packages/nest-ddd';

type CreateMemberProperties = {
  id: string;
  name: string;
  workspaceId: string;
};

export class Member extends EntityBase<string> {
  private readonly _name: string;
  private _workspaceId: string;

  constructor({ id, name, workspaceId }: CreateMemberProperties) {
    super(id);
    this._name = name;
    this._workspaceId = workspaceId;
  }

  get name(): string {
    return this._name;
  }

  get workspaceId(): string {
    return this._workspaceId;
  }

  private set workspaceId(value: string) {
    this._workspaceId = value;
  }
}
