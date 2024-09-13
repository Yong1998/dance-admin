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
// import { TokenService } from "./services/token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAccessEntity } from "./entities/access-token.entities";
import { TokenService } from "./services/token.service";
import { RefreshTokenEntity } from "./entities/refresh-token.entities";
import { AccountController } from "./controllers/account.controller";
import { PermModule } from "../system/permission/perm.module";
import { RoleModule } from "../system/role/role.module";
import { RoleService } from "../system/role/role.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccessEntity, RefreshTokenEntity]),
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
    PermModule,
    RoleModule
  ],
  providers: [AuthService, RoleService, TokenService, JwtStrategy],
  controllers: [AuthController, AccountController],
  exports: [TypeOrmModule, JwtModule, AuthService, TokenService],
})

export class AuthModule {}