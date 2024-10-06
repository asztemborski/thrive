import { IsISO8601, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateInvitationRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsISO8601({ strict: true, strictSeparator: true })
  @Type(() => Date)
  @IsNotEmpty()
  readonly expiresAt?: Date;
}
