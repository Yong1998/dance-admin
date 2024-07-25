import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';

import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { IS_PUBLIC_KEY } from "./auth.decorator";
import { JWT } from "./constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  private extractTokenFromHeader(req:Request):string|undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /** 白名单控制 START */
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if(isPublic) return true;
    /** 白名单控制 END*/

    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req)
    if(!token) {
      throw new UnauthorizedException('请先登录')
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: JWT.secret })
      req.user = payload
    } catch (error) {
      throw new UnauthorizedException('token无效')
    }
    return true
  }
}