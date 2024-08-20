import { Injectable } from '@nestjs/common';
import { UserDto, UserQueryDto, UserUpdateDto } from './dto/user.dto';
import { User } from './schema.ts/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { isEmpty } from 'lodash';
// import { AuthService } from '../auth/auth.service';
import { Role } from './schema.ts/Role.schema';
import * as mongoose from 'mongoose';
import { PermissionDto } from './dto/permission.dto';
import { Permission } from './schema.ts/Permission.schema';
import { RegisterDto } from '../auth/dto/auth.dto';
import { BusinessException } from 'src/common/exceptions/biz.exception';
import { ErrorEnum } from 'src/constants/error-code.constant';
import { generateUUID, sleep } from '~/utils/tool.uitl';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async register({account, ...data}:RegisterDto): Promise<void> {
    const exists = await this.userModel.findOne({account}).exec()
    if(exists) {
      throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)
    } 

    const passwordHash = await bcrypt.hash(data.password, 10)
    const u = {
      account,
      username: data.username,
      passwordHash,
    }
    const user = new this.userModel(u)
    await user.save()
  }

  async create({account, password, roles, ...user}: UserDto): Promise<void> {
    const exists = await this.userModel.findOne({account: account}).exec()
    if(!isEmpty(exists)) {
      throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)
    } 
    if(!password) {
      // 默认密码
      password = '12345678'
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const u = {
      account,
      passwordHash,
      roles: roles || [],
      ...user
    }
    const newUser = new this.userModel(u)
    await newUser.save()
  }

  async info(id:string): Promise<User> {
    const user = await this.userModel.findById(id).exec()
    delete user.passwordHash
    return user
  }

  async list ({ page = 1, pageSize = 10 }: UserQueryDto) {

    // 普通查询分页
    page = Number(page)
    pageSize = Number(pageSize)
    const skip = (page - 1) * pageSize
    // // 获取上一页最后一条数据
    // const lastId = await this.userModel.findOne().sort({_id: 1}).skip(skip).exec() 
    // const result = await this.userModel.find({
    //   _id: { $gte: lastId._id?lastId._id:null }
    // }).sort({_id: 1}).limit(pageSize).exec()

    // 使用聚合查询实现上述功能
    const lastId = await this.userModel.findOne().sort({_id: 1}).skip(skip).exec()
    const result = await this.userModel.aggregate([
      {
        $match: {
          _id: { $gte: lastId._id?lastId._id:null }
        }
      },
      {
        $sort: {
          _id: 1
        }
      },
      {
        $limit: pageSize
      }
    ]).exec()
  


    const total = await this.userModel.countDocuments().exec()
    return {
      list: result,
      total
    }
  }

  async update(id: string, user: UserUpdateDto): Promise<void> {
    const u = await this.userModel.findById(id).exec()
    if(!u) {
      throw new BusinessException(ErrorEnum.USER_NOT_FOUND)
    }
    const { account, password, roles, ...data } = user
    if(account) {
      const exists = await this.userModel.findOne({account}).exec()
      if(exists && exists._id.toString() !== id) {
        throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)
      }
      u.account = account
    }
    if(password) {
      u.passwordHash = await bcrypt.hash(password, 10)
    }
    if(roles) {
      u.roles = roles
    }
    for(const key in data) {
      u[key] = data[key]
    }
    await u.save()
  }

  async delete(ids: string[]): Promise<void> {
    await this.userModel.deleteMany({_id: { $in: ids }}).exec()
  }

  async forceUpdatePassword(id: string, password: string): Promise<void> {
    const u = await this.userModel.findById(id).exec()
    if(!u) {
      throw new BusinessException(ErrorEnum.USER_NOT_FOUND)
    }
    u.passwordHash = await bcrypt.hash(password, 10)
    await u.save()
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
        roles: [],
        status: 1
      }
      users.push(user)
    }
    const res = await this.userModel.insertMany(users)
    return res
  }
  /** 根据用户account查找 */
  async findUserByAccount(account: string): Promise<User | undefined> {
    return this.userModel.findOne({
      account
    }).exec()
  }
}
