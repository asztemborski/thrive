import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryRequestDto {
  @ApiProperty({ default: 'Category name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ default: '00000000-0000-0000-0000-000000000000' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly parentCategoryId?: string;
}
