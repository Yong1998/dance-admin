import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { storeDto } from "./store.dto";
import { EntityManager, In, Repository } from "typeorm";
import { StoreEntity, UserStoreRoleEntity } from "./store.entity";
import { isEmpty } from "lodash";
import { BusinessException } from "~/common/exceptions/biz.exception";
import { ErrorEnum } from "~/constants/error-code.constant";
import { RoleEntity } from "../role/role.entity";
import { UserEntity } from "~/modules/users/user.entity";
import { TokenService } from "~/modules/auth/services/token.service";
import { Inject } from "@nestjs/common";

export class StoreService {
    constructor(
      @InjectEntityManager() private readonly entityManager: EntityManager,
      @InjectRepository(StoreEntity) private readonly storeRepository: Repository<StoreEntity>,
      @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>,
      @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
      @InjectRepository(UserStoreRoleEntity) private userStoreRoleRepository: Repository<UserStoreRoleEntity>,
      @Inject() private readonly tokenService: TokenService
    ) {}

    async loginStore(user:Serv.IAuthUser, storeId: number): Promise<string> {
      const {userId, type} = user
      // 获取店铺下用户的角色
      const roles = await this.userStoreRoleRepository
        .createQueryBuilder('user_store_roles')
        .leftJoinAndSelect('user_store_roles.role', 'role')
        .where('user_store_roles.userId = :userId' , {userId})
        .andWhere('user_store_roles.storeId = :storeId', {storeId})
        .getMany()
      const roleValues = roles.map(r => r.role.key)
      // 重新生成token
      const token = await this.tokenService.generateToken({ uid: userId, storeId, type, roles: roleValues })

      return token.accessToken
    }

    async create(userId:number, dto:storeDto):Promise<{storeId:number}> {
      let storeId = null

      const store = await this.storeRepository.createQueryBuilder('sys_stores')
        .where('sys_stores.name = :name', {name: dto.name})
        .getOne()

      if(!isEmpty(store)) {
        throw new BusinessException(ErrorEnum.STORE_EXISTS)
      }

      await this.entityManager.transaction(async (manage) => {
        // 创建店铺
        const s = manage.create(StoreEntity, {
          name: dto.name,
          key: dto.key,
          address: dto.address,
          remark: dto.remark,
          status: dto.status,
          roles: await this.roleRepository.findBy({id: In(dto.roleIds)}),
          users: await this.userRepository.findBy({id: userId})
        })
        await manage.save(s)
        
        // 生成用户角色关联记录 - 判断是否存在关联记录
        const user = await this.userRepository.findOne({where: {id: userId}, relations: ['roles']})
        const roles = await this.roleRepository.find({where: {id: In(dto.roleIds)}})
        if(user && roles) {
          const newRole = roles.filter(role => !user.roles.includes(role))
          user.roles = user.roles.concat(newRole)
          await manage.save(user)
        }

        // 多个角色生成条用户店铺角色关联记录
        for(let i = 0; i<dto.roleIds.length; i++) {
          const usr = manage.create(UserStoreRoleEntity, {
            userId: userId,
            storeId: s.id,
            roleId: dto.roleIds[i]
          })
          await manage.save(usr)
        }
        storeId = s.id
      })
      return { storeId }
    }

    async getStoreByUserId(userId: number): Promise<StoreEntity[]> {
      const u = await this.userRepository.createQueryBuilder('sys_users')
        .leftJoinAndSelect('sys_users.stores', 'stores')
        .where('sys_users.id = :userId', {userId})
        .getOne()
      const storeIds = u.stores.map(s => s.id)
      if(isEmpty(storeIds)) {
        return null
      }
      return this.storeRepository.findBy({id: In(storeIds)})
    }

}