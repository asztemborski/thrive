import { Allow, IsString } from 'class-validator';

export class AuthConfig {
  @IsString()
  @Allow()
  readonly user: string;

  @IsString()
  @Allow()
  readonly pass: string;
}
