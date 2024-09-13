import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../auth.service";

@ApiTags('ACcount - 账户模块')
@Controller('account')
export class AccountController {
  constructor(
    private authService: AuthService
  ) {}

  @Get('menus')
  async menu(@Query() user: Serv.IAuthUser) {
    return await this.authService.getMenus(user.userId, user.storeId)
  }

}