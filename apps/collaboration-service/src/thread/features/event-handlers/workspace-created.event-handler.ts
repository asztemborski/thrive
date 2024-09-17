import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WorkspaceCreatedDomainEvent } from '../../../workspace/domain/events';
import { InjectRepository } from '@mikro-orm/nestjs';
import { WorkspaceThreads } from '../../domain/entities';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class WorkspaceCreatedEventHandler {
  constructor(
    @InjectRepository(WorkspaceThreads)
    private readonly workspaceThreadsRepository: EntityRepository<WorkspaceThreads>,
  ) {}

  @OnEvent(WorkspaceCreatedDomainEvent.name, { async: true, promisify: true })
  async handle(event: WorkspaceCreatedDomainEvent): Promise<void> {
    const workspaceThreads = new WorkspaceThreads({ id: event.workspace.id });
    await this.workspaceThreadsRepository.getEntityManager().persistAndFlush(workspaceThreads);
  }
}
