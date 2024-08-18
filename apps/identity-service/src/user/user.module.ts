import { Module } from '@nestjs/common';
import { PublicUserController } from './user.controller';

@Module({
  controllers: [PublicUserController],
})
export class UserModule {}
