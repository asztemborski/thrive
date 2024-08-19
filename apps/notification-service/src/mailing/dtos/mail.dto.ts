export class MailDto {
  readonly subject: string;
  readonly templateDirectory: string;
  readonly templateContext: Record<string, any>;
  readonly onSuccess?: () => void;
  readonly onError?: (error?: unknown) => void;

  constructor(properties: MailDto) {
    Object.assign(this, properties);
  }
}
