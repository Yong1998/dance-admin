import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport'
import { ExtractJwt } from 'passport-jwt'
import { IS_PUBLIC_KEY } from "../auth.decorator";
import { AuthStrategy } from "../auth.constant";
import { BusinessException } from "src/common/exceptions/biz.exception";
import { ErrorEnum } from "src/constants/error-code.constant";
import { TokenService } from "../services/token.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategy.JWT) {
  jwtFromRequestFn = ExtractJwt.fromAuthHeaderAsBearerToken()

  constructor(private tokenService: TokenService, private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /** 白名单控制 START */
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    /** 白名单控制 END*/
    const req = context.switchToHttp().getRequest();
    const token = this.jwtFromRequestFn(req)
    let result: any = false;
    try {
      result = await super.canActivate(context)
    } catch (error) {
      if (isPublic) return true

      if(!token) {
        throw new UnauthorizedException('未登录')
      }
      let isValid = await this.tokenService.checkToken(token)
      if(!isValid) {
        throw new BusinessException(ErrorEnum.INVALID_LOGIN)
      }

    }
    return result
  }


  // canActivate(context: ExecutionContext) {
  //   const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //   if (isPublic) {
  //     return true;
  //   }
  //   return super.canActivate(context);
  // }


  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}