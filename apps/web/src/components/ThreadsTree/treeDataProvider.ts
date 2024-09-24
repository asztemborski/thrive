import {
  TreeDataProvider as BaseTreeDataProvider,
  TreeItem,
  TreeItemIndex,
} from 'react-complex-tree';
import { Category, Thread } from '@/components/ThreadsTree/ThreadsTree';

export class TreeDataProvider implements BaseTreeDataProvider {
  private readonly data: Record<TreeItemIndex, TreeItem> = {};
  private treeChangeListeners: ((changedItemIds: TreeItemIndex[]) => void)[] = [];

  constructor(threads: Thread[], categories: Category[]) {
    this.data = this.retrieveTreeData(threads, categories);
  }

  async getTreeItem(itemId: TreeItemIndex) {
    return this.data[itemId];
  }

  async onChangeItemChildren(itemId: TreeItemIndex, newChildren: TreeItemIndex[]) {
    this.updateItemChildren(itemId, newChildren);
    this.notifyListeners([itemId]);
  }

  onDidChangeTreeData(listener: (changedItemIds: TreeItemIndex[]) => void) {
    this.treeChangeListeners.push(listener);
    return {
      dispose: () => this.removeListener(listener),
    };
  }

  async onRenameItem(item: TreeItem, name: string) {
    this.data[item.index].data = name;
  }

  addCategory(category: Category) {
    this.addItem(category.id, category.parentCategoryId, category, true);
  }

  addThread(thread: Thread): void {
    this.addItem(thread.id, thread.categoryId, thread, false);
  }

  private addItem(itemId: string, parentId: string | undefined, itemData: any, isFolder: boolean) {
    this.data[itemId] = {
      index: itemId,
      isFolder,
      data: itemData,
    };

    if (parentId) {
      this.addToParent(parentId, itemId);
    } else {
      this.addToRoot(itemId);
    }

    this.notifyListeners(['root']);
  }

  private addToParent(parentId: TreeItemIndex, childId: TreeItemIndex) {
    const parent = this.data[parentId];
    if (parent?.children) {
      parent.children.push(childId);
    }
  }

  private addToRoot(itemId: TreeItemIndex) {
    this.data.root.children?.push(itemId);
  }

  private updateItemChildren(itemId: TreeItemIndex, newChildren: TreeItemIndex[]) {
    this.data[itemId].children = newChildren;
  }

  private notifyListeners(changedItemIds: TreeItemIndex[]) {
    this.treeChangeListeners.forEach((listener) => listener(changedItemIds));
  }

  private removeListener(listener: (changedItemIds: TreeItemIndex[]) => void) {
    this.treeChangeListeners = this.treeChangeListeners.filter((l) => l !== listener);
  }

  private retrieveTreeData(threads: Thread[], categories: Category[]) {
    const categoryItems = this.buildCategoryItems(threads, categories);
    const threadItems = this.buildThreadItems(threads);
    const rootChildren = this.buildRootChildren(threads, categories);

    return {
      root: {
        index: 'root',
        data: 'Root item',
        isFolder: true,
        children: rootChildren,
      },
      ...threadItems,
      ...categoryItems,
    };
  }

  private buildCategoryItems(threads: Thread[], categories: Category[]) {
    return categories.reduce(
      (acc, category) => {
        const categoryThreads = this.getItemsByCategory(threads, category.id);
        const subCategories = this.getSubCategories(categories, category.id);

        acc[category.id] = {
          index: category.id,
          isFolder: true,
          children: [...categoryThreads, ...subCategories],
          data: category,
        };

        return acc;
      },
      {} as Record<TreeItemIndex, TreeItem>,
    );
  }

  private buildThreadItems(threads: Thread[]) {
    return threads.reduce(
      (acc, thread) => {
        acc[thread.id] = {
          index: thread.id,
          isFolder: false,
          children: [],
          data: thread,
        };
        return acc;
      },
      {} as Record<TreeItemIndex, TreeItem>,
    );
  }

  private buildRootChildren(threads: Thread[], categories: Category[]) {
    const rootThreads = this.getItemsByCategory(threads, undefined);
    const rootCategories = this.getSubCategories(categories, undefined);

    return [...rootThreads, ...rootCategories];
  }

  private getItemsByCategory(threads: Thread[], categoryId: TreeItemIndex | undefined) {
    if (!categoryId) return threads.map((thread) => thread.id);

    return threads.filter((thread) => thread.categoryId === categoryId).map((thread) => thread.id);
  }

  private getSubCategories(categories: Category[], parentCategoryId: TreeItemIndex | undefined) {
    if (!parentCategoryId) return categories.map((subCategory) => subCategory.id);

    return categories
      .filter((category) => category.parentCategoryId === parentCategoryId)
      .map((category) => category.id);
  }
}
