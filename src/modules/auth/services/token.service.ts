import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserAccessToken } from "../schema/access-token.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISecurityConfig, SecurityConfig } from "~/config";
import * as dayjs from "dayjs";
import { generateUUID } from "~/utils/tool.uitl";
import { UserRefreshToken } from "../schema/refresh-token.schema";

interface IGenerateToken {
  accessToken?: string
  refreshToken?: string
}

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService, 
    @Inject(SecurityConfig.KEY) private readonly securityConfig: ISecurityConfig,
    @InjectModel(UserAccessToken.name) private readonly tokenModel: Model<UserAccessToken>,
    @InjectModel(UserRefreshToken.name) private readonly refreshTokenModel: Model<UserRefreshToken>
  ) {}

  async generateToken(uid: string, roles: string[]): Promise<IGenerateToken> {
    const payLoad: Serv.IAuthUser = {
      uid,
      roles,
      pv: 1,
    }

    const jwtSign = await this.jwtService.signAsync(payLoad)

    const tokens = {
      value: jwtSign,
      expiredAt: dayjs().add(this.securityConfig.jwtExpire, 'second').toDate(),
    }

    const token = new this.tokenModel(tokens)
    await token.save()
  

    const refreshToken = await this.generateRefreshToken(jwtSign, dayjs())

    return {
      accessToken: jwtSign,
      refreshToken: refreshToken
    }
  }

  async generateRefreshToken(accessToken:string, now: dayjs.Dayjs) {
    const payLoad = {
      uuid: generateUUID(),
    }
    const jwtSign = await this.jwtService.signAsync(payLoad, {
      secret: this.securityConfig.refreshSecret
    })

    const refreshTokens = {
      value: jwtSign,
      expiredAt: now.add(this.securityConfig.refreshExpire, 'second').toDate(),
      accessToken
    }
    const refreshToken = new this.refreshTokenModel(refreshTokens)
    await refreshToken.save()
    
    return jwtSign
  }

  /** 检查token是否存在 且处于有效期内 */
  async checkToken(token: string) {
    let isValid = false
    try {
      await this.verifyToken(token)
      const res = await this.tokenModel.findOne({value: token}).exec()
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
      




