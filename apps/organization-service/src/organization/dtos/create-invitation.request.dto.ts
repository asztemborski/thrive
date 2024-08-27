import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvitationRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly organizationId: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly expiresAt: Date;
}
