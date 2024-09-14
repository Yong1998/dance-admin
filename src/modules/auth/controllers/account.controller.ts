import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../auth.service";
import { UserService } from "~/modules/users/user.service";
import { AuthUser } from "../decorators/auth-user.decorator";
import { UserQueryDto } from "~/modules/users/dto/user.dto";

@ApiTags('Account - 账户模块')
@Controller('account')
export class AccountController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Get('list')
  @ApiOperation({ summary: '获取账号列表', description: '所有用户列表/绑定商户列表' })
  async list(@AuthUser() user: Serv.IAuthUser, @Query() dto: UserQueryDto) {
    return await this.userService.list(user, dto)
  }

  // @Get('menus')
  // async menu(@Query() user: Serv.IAuthUser) {
  //   return await this.authService.getMenus(user.userId, user.storeId)
  // }

}