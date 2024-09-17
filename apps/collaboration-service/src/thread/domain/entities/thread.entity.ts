import { EntityBase } from '@packages/nest-ddd';
import { ThreadCannotBeAssignedToCurrentCategoryException } from '../exceptions';

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
      throw new ThreadCannotBeAssignedToCurrentCategoryException();
    }

    this._categoryId = categoryId;
  }

  get name(): string {
    return this._name;
  }

  get categoryId(): string | undefined {
    return this._categoryId;
  }
}
