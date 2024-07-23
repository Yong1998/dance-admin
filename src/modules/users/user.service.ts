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
      message: '请求成功',
      data: null
    }
    const queryUser = await this.userModel.find({account: user.account}).exec()
    if(queryUser.length) {
      result.isSuccess = false
      result.message = '账号已存在11'
      return Promise.resolve(result)
    } else {
      const createUser = new this.userModel(user)
      const res = await createUser.save()
      result.isSuccess = true
      result.message = '注册成功'
      result.data = res
      return Promise.resolve(result)
    }
  }
}
