import { Injectable, HttpStatus} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: CreateUserDto): Promise<any> {
    const result = {
      isSuccess: true,
      data: {
        code: 0,
        data: null,
        message: '创建成功',
      }
    }

    if(!user.account || !user.password) {
      result.isSuccess = false
      result.data.code = -1
      result.data.message = '账号密码不能为空'
      return Promise.resolve(result)
    } else {
      const queryUser = await this.userModel.find({account: user.account}).exec()
      if(queryUser.length) {
        result.isSuccess = false
        result.data.code = -1
        result.data.message = '账号已存在'
        return Promise.resolve(result)
      } else {
        const createUser = new this.userModel(user)
        const res = await createUser.save()
        result.isSuccess = true
        result.data.code = 0
        result.data.message = '注册成功'
        result.data.data = res
        return Promise.resolve(result)
      }
    }
  }
}
