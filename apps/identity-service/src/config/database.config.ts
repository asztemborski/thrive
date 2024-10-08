import { Allow, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DatabaseConfig {
  @IsNumber()
  @Type(() => Number)
  @Allow()
  readonly port: number;

  @IsString()
  @Allow()
  readonly host: string;

  @IsString()
  @Allow()
  readonly database: string;

  @IsString()
  @Allow()
  readonly user: string;

  @IsString()
  @Allow()
  readonly password: string;
}
