import { applyDecorators, Controller, ControllerOptions } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isString } from "@packages/nest-utilities";

export const PrivateController = ({
  path,
  ...options
}: ControllerOptions & { tag?: string }): ClassDecorator => {
  return applyDecorators(
    ApiTags(options.tag ?? (isString(path) ? path : "")),
    ApiResponse({ status: 401 }),
    ApiBearerAuth(),
    Controller({ ...options, path: `private/${path}` }),
  );
};
