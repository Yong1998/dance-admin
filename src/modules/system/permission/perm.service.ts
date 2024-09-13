import { PermDto, PermUpdateDto } from "./perm.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PermEntity } from "./perm.entity";
import { Repository } from "typeorm";
import { RoleEntity } from "../role/role.entity";
import { RoleService } from "../role/role.service";
import { isEmpty } from "lodash";
import { generateRouters } from "~/utils/permission.util";

export class PermService {
  constructor(
    @InjectRepository(PermEntity) private permRepository: Repository<PermEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    private roleService: RoleService
  ) {}

  async create(dto: PermDto) {
    return await this.permRepository.save(dto)
  }

  async update(id:number, perm: PermUpdateDto) {
    await this.permRepository.update(id, perm)
  }

  /**
   * 获取用户角色所有权限
   */
  async getPermissions(userId: number, storeId: number) {
    const roleIds = await this.roleService.getRoleIdByUser(userId, storeId)
    let perms = []
    if(isEmpty(roleIds)) {
      return perms
    }

    // 角色有管理员则获取全部权限
    // todo...

    // 获取角色权限
    perms = await this.permRepository.createQueryBuilder('perm')
      .innerJoinAndSelect('perm.roles', 'role')
      .andWhere('role.id IN (:...roleIds)', { roleIds })
      .orderBy('sort', 'ASC')
      .getMany()

    const menuList = generateRouters(perms)
    return menuList
  }
}