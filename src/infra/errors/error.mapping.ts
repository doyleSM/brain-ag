import { HttpStatus } from '@nestjs/common';

const errorMapping = {
  ConflictError: HttpStatus.CONFLICT,
  UnprocessableEntityError: HttpStatus.UNPROCESSABLE_ENTITY,
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
