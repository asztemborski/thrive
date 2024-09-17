import { AggregateRoot } from '@packages/nest-ddd';
import { Collection } from '@mikro-orm/core';
import { Thread } from './thread.entity';
import { ThreadCategory } from './thread-category.entity';

type CreateWorkspaceThreadsProperties = {
  id: string;
};

export class WorkspaceThreads extends AggregateRoot {
  private readonly _categories: Collection<ThreadCategory>;
  private readonly _threads: Collection<Thread>;

  constructor({ id }: CreateWorkspaceThreadsProperties) {
    super(id);
    this._categories = new Collection<ThreadCategory>(this);
    this._threads = new Collection<Thread>(this);
  }

  addThread(name: string, categoryId?: string): void {
    if (this._threads.count() > 100) {
      throw new Error('Threads count cannot exceed 100');
    }

    const thread = new Thread({ name, workspaceId: this._id });
    this._threads.add(thread);

    categoryId && thread.assignToCategory(categoryId);
  }

  addCategory(name: string, parentCategoryId?: string): void {
    if (this._categories.count() > 30) {
      throw new Error('Categories count cannot exceed 30');
    }

    if (!parentCategoryId) {
      const category = new ThreadCategory({ name, workspaceId: this._id });
      return this._categories.add(category);
    }

    const parentCategory = this.findCategory(parentCategoryId);

    if (!parentCategory) {
      throw new Error('Category not found');
    }

    const subCategory = parentCategory.addSubCategory(name);
    this._categories.add(subCategory);
  }

  private findCategory(id: string): ThreadCategory | undefined {
    return this._categories.find((category) => category.id === id);
  }

  get categories(): Collection<ThreadCategory> {
    return this._categories;
  }

  get threads(): Collection<Thread> {
    return this._threads;
  }
}
