import { JwtModule } from "@nestjs/jwt";
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JWT } from "./constants";

const jwtModule = JwtModule.register({
  secret: JWT.secret,
  signOptions: { expiresIn: JWT.expiresIn }, // token过期时间
})

@Module({
  imports: [jwtModule, PassportModule],
  providers: [AuthService, JwtStrategy],
  exports: [jwtModule, AuthService],
})

export class AuthModule {}