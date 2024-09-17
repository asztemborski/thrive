import { EntityBase } from '@packages/nest-ddd';
import { Collection } from '@mikro-orm/core';
import { SubCategoryCannotHaveSubCategoriesException } from '../exceptions';

type CreateThreadCategoryProperties = {
  name: string;
  workspaceId: string;
  parentCategoryId?: string;
};

export class ThreadCategory extends EntityBase {
  private readonly _name: string;
  private readonly _workspaceId: string;
  private readonly _parentCategoryId?: string;
  private readonly _subCategories: Collection<ThreadCategory>;

  constructor({ name, workspaceId, parentCategoryId }: CreateThreadCategoryProperties) {
    super(crypto.randomUUID());
    this._name = name;
    this._workspaceId = workspaceId;
    this._parentCategoryId = parentCategoryId;
    this._subCategories = new Collection<ThreadCategory>(this);
  }

  addSubCategory(name: string): ThreadCategory {
    if (this._parentCategoryId) {
      throw new SubCategoryCannotHaveSubCategoriesException();
    }

    const subCategory = new ThreadCategory({
      name,
      workspaceId: this._workspaceId,
      parentCategoryId: this._id,
    });

    this._subCategories.add(subCategory);
    return subCategory;
  }

  get name(): string {
    return this._name;
  }

  get parentCategoryId(): string | undefined {
    return this._parentCategoryId;
  }
}
