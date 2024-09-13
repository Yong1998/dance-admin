import { Body, Controller, Post, Query, Get } from "@nestjs/common";
import { UserService } from "../users/user.service";
import {LoginDto, RegisterDto} from './dto/auth.dto'
import { isPublic } from "../auth/auth.decorator";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @isPublic()
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto) {
    return await this.userService.register(dto)
  }

  @isPublic()
  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto.account, dto.password)
    return { token }
  }
}