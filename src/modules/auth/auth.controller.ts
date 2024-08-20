import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../users/user.service";
import {LoginDto, RegisterDto} from './dto/auth.dto'
import { isPublic } from "../auth/auth.decorator";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @isPublic()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.userService.register(dto)
  }

  @isPublic()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto.account, dto.password)
    return { token }
  }

}