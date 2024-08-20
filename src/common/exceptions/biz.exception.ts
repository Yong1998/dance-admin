import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorEnum } from "src/constants/error-code.constant";
import { RESPONSE_SUCCESS_CODE } from "src/constants/response.constant";

export class BusinessException extends HttpException {
    private errorCode: number;

    constructor(error: ErrorEnum | string) {
      if(!error.includes(':')) {
        super(
          HttpException.createBody({
            code: RESPONSE_SUCCESS_CODE,
            message: error,
          }),
          HttpStatus.OK
        )
        return
      }

      const [code, message] = error.split(':')
      super(
        HttpException.createBody({
          code: Number(code),
          message,
        }),
        HttpStatus.OK
      )

      this.errorCode = Number(code)
    }

    getErrorCode(): number {
      return this.errorCode
    }
}

export { BusinessException as BizException }