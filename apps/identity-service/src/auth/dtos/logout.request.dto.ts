import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutRequestDto {
  @ApiProperty({
    default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}
