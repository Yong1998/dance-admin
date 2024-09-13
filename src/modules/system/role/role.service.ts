import { RoleDto } from "./role.dto";
import { BusinessException } from "~/common/exceptions/biz.exception";
import { ErrorEnum } from "~/constants/error-code.constant";
import { isEmpty } from "lodash";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "./role.entity";
import { Repository, In, EntityManager } from "typeorm";
import { PermEntity } from "../permission/perm.entity";
import { UserStoreRoleEntity } from "../store/store.entity";

export class RoleService {
  constructor (
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermEntity) private permRepository: Repository<PermEntity>,
    @InjectRepository(UserStoreRoleEntity) private userStoreRoleRepository: Repository<UserStoreRoleEntity>,
    @InjectEntityManager() private entityManager: EntityManager
  ) {}

  async create(dto:RoleDto):Promise<{ roleId: number }> {
    const role = await this.roleRepository.save({
      ...dto,
      permissions: dto.permIds?await this.permRepository.findBy({id: In(dto.permIds)}):[]
    });
    return { roleId: role.id };
  }
  
  async update(id:number, {permIds, ...data}:RoleDto):Promise<void> {
    await this.roleRepository.update(id, data)
    await this.entityManager.transaction(async (manager) => {
      const role = await this.roleRepository.findOne({where: {id}})
      role.permissions = permIds.length?await this.permRepository.findBy({id: In(permIds)}):[]
      await manager.save(role)
    })
  }

  async info(id: number): Promise<RoleDto> {
    const role = await this.roleRepository
      .createQueryBuilder('role')
      .where({id})
      .getOne()

    const perms = await this.permRepository.find({
      where: {roles: {id}},
      select: ['id']
    })  

    return {
      ...role,
      permIds: perms.map(perm => perm.id)
    }

  }

  async getRoleIdByUser(userId:number, storeId: number):Promise<number[]> {
    const usr = await this.userStoreRoleRepository.createQueryBuilder('userStoreRole')
      .select('roleId')
      .where({userId, storeId})
      .getMany()

    if(!isEmpty(usr)) {
      return usr.map(item => item.roleId)
    }
    return []
  }

  async getRoleValues(ids: number[]): Promise<string[]> {
    return (await this.roleRepository.findBy({id: In(ids)})).map(role => role.key)
  }

}