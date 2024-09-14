import { Inject, Injectable } from "@nestjs/common";
import { BusinessException } from "src/common/exceptions/biz.exception";
import { ErrorEnum } from "src/constants/error-code.constant";
import * as bcrypt from 'bcrypt'
import { TokenService } from "./services/token.service";
import { UserAccessEntity } from "./entities/access-token.entities";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { isEmpty } from "lodash";
import { PermService } from "../system/permission/perm.service";
import { AuthUser } from "./decorators/auth-user.decorator";

@Injectable()
export class AuthService {
  constructor(
    @Inject() private readonly tokenService: TokenService,
    private readonly permService: PermService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserAccessEntity) private readonly userAccessRepository: Repository<UserAccessEntity>,

  ) {}
    
  async login(account: string, password: string):Promise<string> {
    const user = await this.userRepository.createQueryBuilder('sys_users')
      .leftJoinAndSelect('sys_users.roles', 'roles')
      .where('sys_users.account = :account', {account})
      .getOne()

      console.log(`user ===>`, user)

    if(isEmpty(user)) {
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD)
    }

   if(!(await bcrypt.compare(password, user.passwordHash))) {
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD)
    }

    const roles = user.roles.map(role => role.key)
    const token = await this.tokenService.generateToken({uid: user.id, type: user.type, roles})
    return token.accessToken
  }

  // async getMenus(userId: number, storeId: number) {
  //   return this.permService.getPermissions(userId, storeId)
  // }
}