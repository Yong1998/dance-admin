import { HttpException, HttpStatus, ExceptionFilter, ArgumentsHost, Catch, Logger} from "@nestjs/common";
import { ErrorEnum } from "src/constants/error-code.constant";
import { BusinessException } from "../exceptions/biz.exception";

interface myError {
  readonly status: number
  readonly statusCode?: number

  readonly message?: string
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  constructor () {
    this.registerCatchAllExceptionsHook()
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    const url = request.url


    const status = this.getStatus(exception)
    let message = this.getErrorMessage(exception)

    if(status === HttpStatus.INTERNAL_SERVER_ERROR && !(exception instanceof HttpException)) {
      Logger.error(exception, undefined, 'Catch')
      message = ErrorEnum.SERVER_ERROR?.split(':')[1]
    } else {
      this.logger.warn( `错误信息：(${status}) ${message} Path: ${decodeURI(url)}`)
    }

    const apiErrorCode = exception instanceof BusinessException ? exception.getErrorCode() : status
    // 返回基础响应结果
    const resBody: Serv.IRes = {
      code: apiErrorCode,
      message,
      data: null,
    }

    response.status(status).send(resBody)

  }

  getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus()
    } else {
      return (exception as myError)?.status ?? (exception as myError)?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR
    }
  }

  getErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      return exception.message
    } else {
      return (exception as any)?.response?.message ?? (exception as myError)?.message ?? `${exception}`
    }
  }

  registerCatchAllExceptionsHook() {
    process.on('unhandledRejection', (reason) => {
      console.error('unhandledRejection: ', reason)
    })

    process.on('uncaughtException', (err) => {
      console.error('uncaughtException: ', err)
    })
  }

}