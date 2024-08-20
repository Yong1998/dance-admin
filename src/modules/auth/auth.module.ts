import { JwtModule } from "@nestjs/jwt";
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'; // 认证中间件 方便拓展多种认证方式 如果联合使用多种认证方式
import { isDev } from '~/global/env'
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from "./auth.controller";
import { UserModule } from "../users/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ConfigKeyPaths, ISecurityConfig } from "~/config";
import { TokenService } from "./services/token.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UatSchema, UserAccessToken } from "./schema/access-token.schema";
import { UrtSchema, UserRefreshToken } from "./schema/refresh-token.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAccessToken.name, schema: UatSchema },
      { name: UserRefreshToken.name, schema: UrtSchema }
    ]), // 注册模型
    PassportModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
        const {jwtSecret, jwtExpire} = configService.get<ISecurityConfig>('security')
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: `${jwtExpire}s` }, // token过期时间
          ignoreExpiration: isDev,
        }
      },
      inject: [ConfigService]
    }), 
    UserModule,
   
  ],
  providers: [AuthService, JwtStrategy, TokenService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, TokenService],
})

export class AuthModule {}