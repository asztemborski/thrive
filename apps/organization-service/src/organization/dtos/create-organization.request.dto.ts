import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
