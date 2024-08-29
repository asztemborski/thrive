import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvitationRequestDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly expiresAt: Date;
}
