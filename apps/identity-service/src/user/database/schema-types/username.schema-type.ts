import { Platform, TransformContext, Type } from '@mikro-orm/core';
import { Username } from '../../domain/username.value-object';

export class UsernameSchemaType extends Type<Username, string> {
  override convertToDatabaseValue(name: Username): string {
    return name.value;
  }

  override convertToJSValue(value: string): Username {
    return new Username({ value });
  }
}
