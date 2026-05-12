import {
  type ExceptionFilter,
  Catch,
  type ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';

type ExceptionResponse = {
  message?: string | string[];
};
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() as HttpStatus;

    let statusCode = '99'; // Default error code
    let message = 'Internal server error';

    // Map HTTP status codes to custom status codes
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        statusCode = '400';
        break;
      case HttpStatus.UNAUTHORIZED:
        statusCode = '401';
        message = 'Unauthorized';
        break;
      case HttpStatus.FORBIDDEN:
        statusCode = '403';
        message = 'Forbidden';
        break;
      case HttpStatus.NOT_FOUND:
        statusCode = '404';
        message = 'Not found';
        break;
      case HttpStatus.CONFLICT:
        statusCode = '405';
        message = 'Conflict';
        break;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        message = 'Internal server error';
        break;
    }

    const exceptionResponse = exception.getResponse() as ExceptionResponse;
    if (typeof exceptionResponse === 'object' && exceptionResponse['message']) {
      message = Array.isArray(exceptionResponse['message'])
        ? exceptionResponse['message'].join(', ')
        : exceptionResponse['message'];
    }

    response.status(200).json({
      statusCode,
      message,
      data: null,
      // timestamp: new Date().toISOString(),
    });
  }
}
