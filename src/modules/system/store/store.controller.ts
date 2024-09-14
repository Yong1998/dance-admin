import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthUser } from "~/modules/auth/decorators/auth-user.decorator";
import { storeDto } from "./store.dto";
import { StoreService } from "./store.service";
import { UserEntity } from "~/modules/users/user.entity";

@ApiTags('system-店铺模块')
@Controller('store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService
  ) {}

  @Post('login')
  async loginStore(@AuthUser() user: Serv.IAuthUser, @Body() dto:{storeId:number}) {
    return this.storeService.loginStore(user, dto.storeId)
  }

  @Post('create')
  @ApiOperation({summary: '创建店铺'})
  async create(@AuthUser() user: Serv.IAuthUser, @Body() dto: storeDto) {
    return this.storeService.create(user.userId, dto)
  }

  @Get()
  @ApiOperation({summary: '获取店铺列表'})
  async list(@AuthUser() user: Serv.IAuthUser) {
    return this.storeService.getStoreByUserId(user.userId)
  }
}