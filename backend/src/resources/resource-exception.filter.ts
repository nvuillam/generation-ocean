import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(Error)
export class OtherExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      error_type: 'genericException',
      error_code: 0,
      error_name: exception.name,
      error_msg: exception.message,
    });
  }
}
