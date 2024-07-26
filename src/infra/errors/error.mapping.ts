import { HttpStatus } from '@nestjs/common';

const errorMapping = {
  ConflictError: {
    statusCode: HttpStatus.CONFLICT,
    message: (error) => error.message,
  },
  UnprocessableEntityError: {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    message: (error) => error.message,
  },
};

export function mapErrorToHttpResponse(error: any) {
  const errorType = error.constructor.name;
  const mapping = errorMapping[errorType];

  if (mapping) {
    return {
      statusCode: mapping.statusCode,
      body: {
        statusCode: mapping.statusCode,
        message: mapping.message(error),
      },
    };
  }

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    body: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    },
  };
}
