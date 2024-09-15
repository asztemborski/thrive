import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { ExceptionBase } from "@packages/nest-exceptions";
import { Response } from "express";
import { ApiErrorResponse } from "./api-error.response";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ExceptionBase) {
      return response.status(HttpStatus.BAD_REQUEST).json(
        new ApiErrorResponse({
          title: exception.message,
          code: exception.code,
          statusCode: 400,
          errors: [],
        }),
      );
    }

    this.logger.error(exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      code: 500,
    });
  }
}
