import { AggregateRoot } from '@packages/nest-ddd';
import { Collection, EntityRepository, EntityRepositoryType } from '@mikro-orm/core';
import { Thread } from './thread.entity';
import { ThreadCategory } from './thread-category.entity';
import {
  CategoryDoesNotExistException,
  CategoryMaximumCountExceedException,
  ThreadMaximumCountExceedException,
} from '../exceptions';
import { WorkspaceThreadsRepository } from '../../database/repositories';
import { ReadonlyCollection } from '@packages/database-utilities';

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
      throw new ThreadMaximumCountExceedException(100);
    }

    if (categoryId && !this.findCategory(categoryId)) {
      throw new CategoryDoesNotExistException(categoryId);
    }

    const thread = new Thread({ name, workspaceId: this._id });
    this._threads.add(thread);

    categoryId && thread.assignToCategory(categoryId);
  }

  addCategory(name: string, parentCategoryId?: string): void {
    if (this._categories.count() > 30) {
      throw new CategoryMaximumCountExceedException(30);
    }

    if (!parentCategoryId) {
      const category = new ThreadCategory({ name, workspaceId: this._id });
      return this._categories.add(category);
    }

    const parentCategory = this.findCategory(parentCategoryId);

    if (!parentCategory) {
      throw new CategoryDoesNotExistException(parentCategoryId);
    }

    const subCategory = parentCategory.addSubCategory(name);
    this._categories.add(subCategory);
  }

  private findCategory(id: string): ThreadCategory | undefined {
    return this._categories.find((category) => category.id === id);
  }

  get categories(): ReadonlyCollection<ThreadCategory> {
    return this._categories;
  }

  get threads(): ReadonlyCollection<Thread> {
    return this._threads;
  }
}

export interface WorkspaceThreads {
  [EntityRepositoryType]: WorkspaceThreadsRepository;
}
