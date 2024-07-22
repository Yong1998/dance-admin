import { Body, Controller, Post, Res, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async create(@Body() user: CreateUserDto, @Res() res: any) {
    const result = await this.userService.createUser(user)
    // res.status(HttpStatus.OK).send(result)
    if(result.isSuccess) {
      res.status(HttpStatus.OK).send(result.data)
    } else {
      res.status(HttpStatus.OK).send(result.data)
    }
  }

}