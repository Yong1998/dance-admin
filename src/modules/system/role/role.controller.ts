import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleDto } from "./role.dto";
import { isPublic } from "~/modules/auth/auth.decorator";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('system-角色模块')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @ApiOperation({summary: '创建角色'})
  async create(@Body() dto: RoleDto) {
    await this.roleService.create(dto);
  }

  @Put(':id')
  @ApiOperation({summary: '更新角色'})
  async update(@Param('id') id:number, @Body() dto: RoleDto) {
    await this.roleService.update(id, dto);
  }

  @Get(':id')
  @ApiOperation({summary: '查询角色'})
  async query(@Param('id') id: number) {
    return this.roleService.info(id);
  }
}