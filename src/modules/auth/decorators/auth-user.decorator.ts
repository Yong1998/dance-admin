import { ExecutionContext, createParamDecorator } from '@nestjs/common'
type Payload = keyof Serv.IAuthUser

/**
 * @description 获取当前登录用户信息, 并挂载到request上
 */
export const AuthUser = createParamDecorator(
  (data: Payload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    // auth guard will mount this
    const user = request.user as Serv.IAuthUser

    return data ? user?.[data] : user
  },
)
