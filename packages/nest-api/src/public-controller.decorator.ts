import { applyDecorators, Controller, ControllerOptions } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { isString } from "@packages/nest-utilities";

export const PublicController = ({
  path,
  ...options
}: ControllerOptions & { tag?: string }): ClassDecorator => {
  return applyDecorators(
    ApiTags(options.tag ?? (isString(path) ? path : "")),
    Controller({ ...options, path: `public/${path}` }),
  );
};
