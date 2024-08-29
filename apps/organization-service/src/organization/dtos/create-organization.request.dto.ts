import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationRequestDto {
  @ApiProperty({ default: 'Organization name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ default: 'Organization description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
