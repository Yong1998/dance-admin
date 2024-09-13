import { Body, Controller, Post } from "@nestjs/common";
import { PermService } from "./perm.service";
import { PermDto } from "./perm.dto";
import { isPublic } from "~/modules/auth/auth.decorator";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PermEntity } from "./perm.entity";
import { isEmpty } from "lodash";
import { BusinessException } from "~/common/exceptions/biz.exception";
import { ErrorEnum } from "~/constants/error-code.constant";

@ApiTags('system-权限模块')
@Controller('perm')
export class PermController {
  constructor(
    private permService: PermService,
    @InjectRepository(PermEntity) private readonly permRepository: Repository<PermEntity>
  ) {} 

  @Post()
  @ApiOperation({summary: '创建权限'})
  async create(@Body() dto: PermDto) {
    if(dto.name) {
      const perm = await this.permRepository.findOneBy({ name: dto.name });
      if(!isEmpty(perm)) {
        throw new BusinessException(ErrorEnum.PERMISSION_EXISTS);
      }
    }

    return await this.permService.create(dto);
  }

}