import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { mapErrorToHttpResponse } from '../errors/error.mapping';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse();
      response.status(status).json({
        ...(errorResponse as object),
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      const { statusCode, body } = mapErrorToHttpResponse(exception);
      response.status(statusCode).json({
        ...body,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
