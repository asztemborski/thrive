import { EntityBase } from '@packages/nest-ddd';

type CreateThreadProperties = {
  name: string;
  workspaceId: string;
};

export class Thread extends EntityBase {
  private readonly _name: string;
  private readonly _workspaceId: string;
  private _categoryId?: string;

  constructor({ name, workspaceId }: CreateThreadProperties) {
    super(crypto.randomUUID());
    this._name = name;
    this._workspaceId = workspaceId;
  }

  assignToCategory(categoryId: string): void {
    if (categoryId === this._categoryId) {
      throw new Error('Cannot assign to current category');
    }

    this._categoryId = categoryId;
  }
}
