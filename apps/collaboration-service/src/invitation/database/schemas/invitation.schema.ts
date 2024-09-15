// import { date, pgSchema, uuid, varchar } from 'drizzle-orm/pg-core';
//
// import { InferSelectModel, relations } from 'drizzle-orm';
//
// const schema = pgSchema('collaboration');
//
// export const invitations = schema.table('invitation', {
//   id: varchar('code').notNull().primaryKey(),
//   workspaceId: uuid('workspace_id')
//     .references(() => workspaces.id)
//     .notNull(),
//   creatorId: uuid('creator_id').notNull(),
//   expiresAt: date('expires_at'),
//   createdAt: date('created_at'),
// });
//
// export const invitationsRelations = relations(invitations, ({ one }) => ({
//   workspace: one(workspaces, {
//     fields: [invitations.workspaceId],
//     references: [workspaces.id],
//   }),
// }));
//
// export type InvitationSchema = InferSelectModel<typeof invitations>;
