import { PermDto, PermUpdateDto } from "./perm.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PermEntity } from "./perm.entity";
import { Repository } from "typeorm";
import { RoleEntity } from "../role/role.entity";
import { RoleService } from "../role/role.service";
import { isEmpty } from "lodash";
import { generateRouters } from "~/utils/permission.util";
import { UserStoreRoleEntity } from "../store/store.entity";

export class PermService {
  constructor(
    @InjectRepository(PermEntity) private permRepository: Repository<PermEntity>,
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserStoreRoleEntity) private userStoreRoleRepository: Repository<UserStoreRoleEntity>,
    private roleService: RoleService
  ) {}

  async create(dto: PermDto) {
    return await this.permRepository.save(dto)
  }

  async update(id:number, perm: PermUpdateDto) {
    await this.permRepository.update(id, perm)
  }

  /**
   * 获取用户角色所有权限 - 普通用户/商户
   */
  async getPermissions(user: Serv.IAuthUser) {
    const { userId, storeId, type } = user
    let roleIds = [], perms = []
    if(type === 2) {
      // 商户, 查询user_store_role表获取角色
      const roles = await this.userStoreRoleRepository
        .createQueryBuilder('user_store_roles')
        .leftJoinAndSelect('user_store_roles.role', 'role')
        .where('user_store_roles.userId = :userId' , {userId})
        .andWhere('user_store_roles.storeId = :storeId', {storeId})
        .getMany()

      if(isEmpty(roles)) {
        return perms
      }
      roleIds.push(...roles.map(r => r.role.id))
    } else {
      // 其他用户, 查询user_role表获取角色
      const userRoles = await this.roleRepository.createQueryBuilder('sys_roles')
        .innerJoin('sys_roles.users', 'user')
        .where('user.id = :userId', {userId})
        .getMany()
      if(isEmpty(userRoles)) {
        return perms
      }
      roleIds.push(...userRoles.map(r => r.id))
    }
    // 角色有管理员则获取全部权限
    // todo...

    // 获取角色权限
    perms = await this.permRepository.createQueryBuilder('sys_perms')
      .innerJoinAndSelect('sys_perms.roles', 'role')
      .andWhere('role.id IN (:...roleIds)', { roleIds })
      .orderBy('sort', 'ASC')
      .getMany()

    const menuList = generateRouters(perms)
    return menuList
  }
}