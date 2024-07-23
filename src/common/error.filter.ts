import { HttpException, HttpStatus, ExceptionFilter, ArgumentsHost, Catch } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.getResponse() || '系统繁忙，请稍后再试';
    const message = (exceptionResponse as {message:string[]})?.message.toString() ?? exceptionResponse;

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      data: null,
      message,
      success: false,
    });
  }
}
    