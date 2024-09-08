import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkspaceRequestDto {
  @ApiProperty({ default: 'Workspace name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ default: 'Workspace description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
