import { HttpStatus } from '@nestjs/common';

const errorMapping = {
  ConflictError: HttpStatus.CONFLICT,
  UnprocessableEntityError: HttpStatus.UNPROCESSABLE_ENTITY,
  ValidationError: HttpStatus.BAD_REQUEST,
  NotFoundError: HttpStatus.NOT_FOUND,
};

export function mapErrorToHttpResponse(error: any) {
  const errorType = error.constructor.name;
  const statusCode = errorMapping[errorType] || HttpStatus.INTERNAL_SERVER_ERROR;

  return {
    statusCode: statusCode,
    body: {
      statusCode: statusCode,
      message: error.messages || [error.message],
      error: errorType,
    },
  };
}
