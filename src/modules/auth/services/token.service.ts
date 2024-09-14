import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ISecurityConfig, SecurityConfig } from "~/config";
import * as dayjs from "dayjs";
import { generateUUID } from "~/utils/tool.uitl";
import { RefreshTokenEntity } from "../entities/refresh-token.entities";
import { UserAccessEntity } from "../entities/access-token.entities";
import { UserEntity } from "~/modules/users/user.entity";
import { RoleEntity } from "~/modules/system/role/role.entity";
import { StoreEntity } from "~/modules/system/store/store.entity";
import { RoleService } from "~/modules/system/role/role.service";

export interface IGenerateToken {
  accessToken?: string
  refreshToken?: string
}

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService, 
    private roleService: RoleService,
    @Inject(SecurityConfig.KEY) private readonly securityConfig: ISecurityConfig,
  ) {}

  async generateToken(pl: {uid: number, type: number, storeId?: number, roles?: string[]}): Promise<IGenerateToken> {
    const payLoad: Serv.IAuthUser = {
      userId: pl.uid,
      type: pl.type,
      storeId: pl.storeId,
      roles: pl.roles,
    }
    console.log(`payLoad ===>`, payLoad)
    const jwtSign = await this.jwtService.signAsync(payLoad)

    const tokens = new UserAccessEntity()
    tokens.value = jwtSign
    tokens.user = { id: pl.uid } as UserEntity
    pl.storeId && (tokens.store = { id: pl.storeId } as StoreEntity)
    tokens.expired_at = dayjs().add(this.securityConfig.jwtExpire, 'second').toDate()
    await tokens.save()

    const refreshToken = await this.generateRefreshToken(tokens, dayjs())
    return {
      accessToken: jwtSign,
      refreshToken,
    }
  
  }

  async generateRefreshToken(tokens:UserAccessEntity, now: dayjs.Dayjs) {
    const payLoad = {
      uuid: generateUUID(),
    }
    const jwtSign = await this.jwtService.signAsync(payLoad, {
      secret: this.securityConfig.refreshSecret
    })

    const refreshTokens = new RefreshTokenEntity()
    refreshTokens.accessToken = tokens
    refreshTokens.value = jwtSign
    refreshTokens.expired_at = now.add(this.securityConfig.refreshExpire, 'second').toDate()
    await refreshTokens.save()
    
    return jwtSign
  }

  async refreshTokens(accessToken: UserAccessEntity): Promise<IGenerateToken> {
    const {user, refreshToken, store} = accessToken
    if(refreshToken) {
      const now = dayjs()
      if(now.isAfter(refreshToken.expired_at)) {
        return void 0
      }

      const roleIds = await this.roleService.getRoleIdByUser(user.id, store.id)
      const roleValues = await this.roleService.getRoleValues(roleIds)
      const token = await this.generateToken({ uid: user.id, type: user.type, storeId: store.id, roles: roleValues })
      await accessToken.remove()
      return token
    }
    return void 0
  }

  /** 检查token是否存在 且处于有效期内 */
  async checkToken(token: string) {
    let isValid = false
    try {
      await this.verifyToken(token)
      const res = await UserAccessEntity.findOne({
        where: { value: token },
        relations: ['user'],
        cache: true
      })
      isValid = Boolean(res)
    } catch (error) {}
    return isValid
  }

  /** 校验token */
  async verifyToken(token: string): Promise<Serv.IAuthUser> {
    return this.jwtService.verifyAsync(token)
  }

}


// token 根据用户_id+pv+roles角色生成 过期时间xx
// refresh token 根据用户_id+pv+roles角色生成 过期时间7天

// token存储数据库字段设计
//   accessToken: string
//   refreshToken: string
//   expiredAt: Date
//   user_id:string => 对于用户的唯一标识

// refreshToeken 存储数据库字段设计
//   refreshToken: string
//   expiredAt: Date
//   user_id:string => 对于用户的唯一标识  

// 1. 用户登录成功后，生成token和refreshToken，
// 2. 其他接口校验token是否过期
//     如果token过期，返回过期，前端请求refreshToken接口
//       如果refreshToken过期，返回过期，前端请求重新登录
//       如果refreshToken没过期，生成新的token
      




