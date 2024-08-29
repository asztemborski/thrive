import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateRequestDto {
  @ApiProperty({ default: 'example@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ default: 'secretPass!@#' })
  @IsNotEmpty()
  readonly password: string;
}
