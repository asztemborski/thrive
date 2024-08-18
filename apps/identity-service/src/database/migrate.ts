import { FileMigrationProvider, Kysely, Migrator } from 'kysely';
import { Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

async function migrate(db: Kysely<unknown>, logger: Logger): Promise<void> {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '/migrations'),
    }),
  });

  const { error } = await migrator.migrateToLatest();

  error
    ? logger.error('Failed to execute database migrations')
    : logger.log('Database migration applied successfully');
}

export default migrate;
