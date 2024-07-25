import { Body, Controller, Post, Res, HttpStatus, HttpException, UseInterceptors, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserCreateDto, UserLoginDto, UserResetPasswordDto } from "./dto/user.dto";
import { isPublic } from "../auth/auth.decorator";
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @isPublic()
  @Post('create')
  async create(@Body() user: UserCreateDto) {
    const result = await this.userService.createUser(user)
    if(result.isSuccess) {
      return result.data
    } else {
      throw new HttpException(result, HttpStatus.BAD_REQUEST)
    }
  }

  @isPublic()
  @Post('login')
  async login(@Body() params: UserLoginDto) {
    const result = await this.userService.login(params)
    if(result.isSuccess) {
      return result.data
    } else {
      throw new HttpException(result, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('resetPassword')
  async resetPassword(@Body() params: UserResetPasswordDto) {
    const result = await this.userService.resetPassword(params)
    if(result.isSuccess) {
      return result.data
    } else {
      throw new HttpException(result, HttpStatus.BAD_REQUEST)
    }
  }


  @isPublic()
  @Get('/test')
  async test() {
    return 'Hello World!'
  }

}