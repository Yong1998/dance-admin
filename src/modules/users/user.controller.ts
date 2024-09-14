import { Body, Controller, Post, Get, Query, Param, Put, Delete, ParseArrayPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto, UserPasswordDto, UserQueryDto, UserUpdateDto} from "./dto/user.dto";
import { isPublic } from "../auth/auth.decorator";
import { ApiOperation, ApiTags, ApiParam } from "@nestjs/swagger";
import { AuthUser } from "../auth/decorators/auth-user.decorator";
import { PermService } from "../system/permission/perm.service";
import { IdParam } from "~/decorator/id-param.decorator";

@ApiTags('system-用户模块')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private permService: PermService
  ) {}
  
  @Get('setRandomUsers')
  async setRandomUsers(@Query('num') num: number) { 
    return this.userService.setRandomUsers(num)
  }

  @Post('create')
  @ApiOperation({summary: '创建用户'})
  async create(@Body() user: UserDto): Promise<void> {
    await this.userService.create(user)
  }

  @Get('/permissions')
  @ApiOperation({ summary: '获取用户权限' })
  async permissions(@AuthUser() user: Serv.IAuthUser) {
    return this.permService.getPermissions(user)
  }

  @Get(':id')
  @ApiOperation({summary: '查询用户'})
  async query(@IdParam() id: number) {
    return this.userService.info(id)
  }

  @Put(':id')
  @ApiOperation({summary: '更新用户'})
  async update(@IdParam() id: number, @Body() user: UserUpdateDto): Promise<void> {
    await this.userService.update(id, user)
  }  

  @Delete(':id')
  @ApiOperation({summary: '删除用户'})
  @ApiParam({ name: 'id', type: String, schema: { oneOf: [{ type: 'string' }] } })
  async delete(@Param('id', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) : Promise<void> {
    await this.userService.delete(ids)
  }

  @Post(':id/password')
  @ApiOperation({ summary: '更改用户密码' })
  async password(@IdParam() id: number, @Body() dto: UserPasswordDto): Promise<void> {
    await this.userService.forceUpdatePassword(id, dto.password)
  }
}