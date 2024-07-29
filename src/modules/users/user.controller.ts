import { Body, Controller, Post, Res, HttpStatus, HttpException, UseInterceptors, Get, UseGuards, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserCreateDto, UserLoginDto, UserResetPasswordDto } from "./dto/user.dto";
import { isPublic } from "../auth/auth.decorator";
import * as mongoose from 'mongoose';

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

  
  @isPublic()
  @Post('/update/roles')
  async createPermission(@Body('userId') userId: string, @Body('roleIds') roleIds: mongoose.Schema.Types.ObjectId[]) {
    const result = await this.userService.updateRole(userId, roleIds)
    if(result.isSuccess) {
      return result.data
    } else {
      throw new HttpException(result, HttpStatus.BAD_REQUEST)
    }
  }

  @isPublic()
  @Get('/query/user')
  async queryUser(@Query('userId') userId: string) {
    const result = await this.userService.queryUser(userId)
    if(result.isSuccess) {
      return result.data
    } else {
      throw new HttpException(result, HttpStatus.BAD_REQUEST)
    }
  } 

  @isPublic()
  @Post('create/role')
  async createRole(@Body() role: any) {
    const result = await this.userService.createRole(role)
    if(result.isSuccess) {
      return result.data
    } else {
      throw new HttpException(result, HttpStatus.BAD_REQUEST)
    }
  }
}