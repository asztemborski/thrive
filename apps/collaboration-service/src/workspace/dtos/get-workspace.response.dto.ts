import { Expose } from 'class-transformer';

export class GetWorkspaceResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly iconUrl: string | null;
}
