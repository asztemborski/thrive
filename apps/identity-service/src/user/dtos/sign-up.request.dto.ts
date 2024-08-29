import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Match } from '@packages/nest-utilities';
import { ApiProperty } from '@nestjs/swagger';

const EMAIL_MIN_LENGTH = 5;
const EMAIL_MAX_LENGTH = 100;

const PASSWORD_MIN_LENGTH = 6;

export class SignUpRequestDto {
  @ApiProperty({ default: 'example@mail.com' })
  @MaxLength(EMAIL_MAX_LENGTH)
  @MinLength(EMAIL_MIN_LENGTH)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ default: 'username123' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ default: 'secretPass!@#' })
  @MinLength(PASSWORD_MIN_LENGTH)
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ default: 'secretPass!@#' })
  @Match<SignUpRequestDto>('password')
  @MinLength(PASSWORD_MIN_LENGTH)
  @IsNotEmpty()
  readonly confirmPassword: string;
}
