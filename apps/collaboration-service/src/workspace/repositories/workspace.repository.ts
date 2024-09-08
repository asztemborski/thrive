import { Inject, Injectable } from '@nestjs/common';

import { IMemberMapper, IWorkspaceMapper, IWorkspaceRepository } from '../contracts';
import { Database } from '../../database/schema';
import { InjectDrizzle } from '@packages/nest-drizzle';
import { members, workspaces } from '../database';
import { and, eq } from 'drizzle-orm';
import { Workspace } from '../domain/aggregate-roots';

@Injectable()
export class WorkspaceRepository implements IWorkspaceRepository {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    @Inject(IWorkspaceMapper) private readonly workspaceMapper: IWorkspaceMapper,
    @Inject(IMemberMapper) private readonly memberMapper: IMemberMapper,
  ) {}

  async getById(workspaceId: string): Promise<Workspace | undefined> {
    const workspace = await this.db.query.workspaces.findFirst({
      where: (workspace) => eq(workspace.id, workspaceId),
      with: {
        members: true,
      },
    });

    return workspace && this.workspaceMapper.toDomain(workspace);
  }

  async getMemberWorkspaces(memberId: string): Promise<Workspace[]> {
    const workspaces = await this.db.query.workspaces.findMany({
      with: {
        members: {
          where: eq(members.id, memberId),
        },
      },
    });

    return workspaces.map((workspace) =>
      this.workspaceMapper.toDomain({ ...workspace, members: [] }),
    );
  }

  async exists(workspaceId: string): Promise<boolean> {
    const result = await this.db
      .select({ id: workspaces.id })
      .from(workspaces)
      .where(eq(workspaces.id, workspaceId))
      .limit(1);

    return result[0] !== undefined;
  }

  async create(workspace: Workspace): Promise<void> {
    const workspaceSchema = this.workspaceMapper.toPersistence(workspace);
    const membersSchema = workspace.members.map((member) =>
      this.memberMapper.toPersistence(member, workspace.id),
    );
    await this.db.transaction(async (tx) => {
      await tx.insert(workspaces).values(workspaceSchema);
      await tx.insert(members).values(membersSchema);
    });
  }

  async saveMember(workspace: Workspace, memberId: string): Promise<void> {
    const member = workspace.members.find((member) => member.id === memberId);

    if (!member) return;

    const schema = this.memberMapper.toPersistence(member, workspace.id);
    await this.db.insert(members).values(schema);
  }

  async memberExists(id: string, memberId: string): Promise<boolean> {
    const result = await this.db
      .select({ id: members.id })
      .from(members)
      .where(and(eq(members.id, memberId), eq(members.workspaceId, id)))
      .limit(1);

    return result[0] !== undefined;
  }
}
