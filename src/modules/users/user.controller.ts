import { Body, Controller, Post, Res, HttpStatus, HttpException, UseInterceptors, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async create(@Body() user: CreateUserDto) {
    const result = await this.userService.createUser(user)
    // console.log(`res ===>`, res)
    // res.status(HttpStatus.OK).send(result)
    if(result.isSuccess) {
      // res.status(HttpStatus.OK).send(result.data)
      return result.data
    } else {
      throw new HttpException(result, HttpStatus.BAD_REQUEST)
      // res.status(HttpStatus.OK).send(result.data)
    }
  }

  @Get('cat')
  async cat() {
    return '123131313'
  }

}