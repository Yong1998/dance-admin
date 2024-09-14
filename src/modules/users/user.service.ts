import { Injectable } from '@nestjs/common';
import { UserDto, UserQueryDto, UserUpdateDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'
import { isEmpty, isNil } from 'lodash';
import { RegisterDto } from '../auth/dto/auth.dto';
import { BusinessException } from 'src/common/exceptions/biz.exception';
import { ErrorEnum } from 'src/constants/error-code.constant';
import { generateUUID } from '~/utils/tool.uitl';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { EntityManager, Repository, In, Like } from 'typeorm';
import { RoleEntity } from '../system/role/role.entity';
import { Pagination } from '~/helper/paginate/pagination';
import { paginate } from '~/helper/paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>
  ) {}

  async register({account, ...data}:RegisterDto): Promise<void> {
    const exists = await this.userRepository.findOneBy({account})
    if(!isEmpty(exists)) {
      throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)
    } 

    await this.entityManager.transaction(async (manager: EntityManager) => {
      const passwordHash = await bcrypt.hash(data.password, 10)
      const u = manager.create(UserEntity, {
        account,
        username: data.username,
        passwordHash,
      })
      
      const user = await manager.save(u)
      return user
    })
  }

  async create({account, password, ...user}: UserDto): Promise<void> {
    const exists = await this.userRepository.findOneBy({account: account})
    if(!isEmpty(exists)) {
      throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)
    } 
    await this.entityManager.transaction(async (manager) => {
      let passwordHash = ''
      if(isEmpty(password)) {
        password = '12345678'
        passwordHash = await bcrypt.hash(password, 10)
      } else {
        passwordHash = await bcrypt.hash(password, 10)
      }

      const u = manager.create(UserEntity, {
        account,
        passwordHash,
        ...user,
      })

      const result = await manager.save(u)
      return result
    })
  }

  async info(id:number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.id = :id', { id })
      .getOne()
    delete user.passwordHash
    delete user.accessTokens
    return user
  }

  async list ({storeId, type}: Serv.IAuthUser, { page, pageSize, username, nickname, email, status }: UserQueryDto): Promise<Pagination<UserEntity>> {
    // 如果是商户用户，只能查看自己绑定店铺下的用户
    // 如果是系统用户，可以查看所有用户
    // todo...
    //  管理员角色可以查看所有用户
    //  商户管理员角色可以查看自己绑定店铺下的用户
    const queryBuilder = this.userRepository.createQueryBuilder('sys_users')
    if(type === 2) {
      queryBuilder.leftJoin('sys_users.stores', 'stores')
      queryBuilder.andWhere('stores.id = :storeId', { storeId })
    }
    if(!isNil(status)) {
      queryBuilder.andWhere('sys_users.status = :status', { status })
    }
    if(username) {
      queryBuilder.andWhere('sys_users.username like :username', { username: `%${username}%` })
    }
    if(nickname) {
      queryBuilder.andWhere('sys_users.nickname like :nickname', { nickname: `%${nickname}%` })
    }
    if(email) {
      queryBuilder.andWhere('sys_users.email like :email', { email: `%${email}%` })
    }
    return paginate<UserEntity>(queryBuilder, { page, pageSize })
  }

  async update(id: number, {password, status, ...data}: UserUpdateDto): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      let passwordHash = ''
      if(password) {
        passwordHash = await bcrypt.hash(password, 10)
      }
      await manager.update(UserEntity, id, {
        ...data,
        passwordHash,
        status
      })
    })
  }

  async delete(ids: string[]): Promise<void> {
    await this.userRepository.delete(ids)
  }

  async forceUpdatePassword(id: number, password: string): Promise<void> {
    // const u = await this.userRepository.findOneBy({id})
    const newPassword = await bcrypt.hash(password, 10)
    await this.userRepository.update({id}, { passwordHash: newPassword })
  }

  /** 插入随机用户数据 */
  async setRandomUsers(number = 10) {
    const users = []
    for(let i = 0; i < number; i++) {
      const randomStr = generateUUID(5)
      const user = {
        account: `${randomStr}`,
        username: `${randomStr}`,
        passwordHash: await bcrypt.hash('123456', 10),
        phone: `1325055501/${i}`,
        email: '',
        roleIds: [1],
        status: 1
      }
      users.push(user)
    }
    // 插入多个用户
    const res = await this.userRepository.insert(users)
    return res
  }
}
