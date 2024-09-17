import { WorkspaceThreadsEntitySchema } from './workspace-threads.entity-schema';
import { ThreadCategoryEntitySchema } from './thread-category.entity-schema';
import { ThreadEntitySchema } from './thread.entity-schema';

export * from './workspace-threads.entity-schema';
export * from './thread-category.entity-schema';

export const databaseSchemas = [
  WorkspaceThreadsEntitySchema,
  ThreadCategoryEntitySchema,
  ThreadEntitySchema,
];
