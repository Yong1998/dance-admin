import { Injectable } from '@nestjs/common';
import { UserCreateDto, UserLoginDto, UserResetPasswordDto } from './dto/user.dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly authService: AuthService) {}

  async createUser(user: UserCreateDto): Promise<Serv.Res> {
    const result = {
      isSuccess: true,
      message: '请求成功',
      data: null
    }
    const queryUser = await this.userModel.find({account: user.account}).exec()
    if(queryUser.length) {
      result.isSuccess = false
      result.message = '账号已存在'
      return Promise.resolve(result)
    } else {
      user.password = await bcrypt.hash(user.password, 10)
      const createUser = new this.userModel({
        account: user.account,
        username: user.username,
        passwordHash: user.password,
        email: user.email
      })
      const res = await createUser.save()
      result.isSuccess = true
      result.data = res
      return Promise.resolve(result)
    }
  }

  async login(params: UserLoginDto) : Promise<Serv.Res> {
    const result = {
      isSuccess: true,
      message: '请求成功',
      data: null
    }
    const user = await this.userModel.findOne({account: params.account}).exec()
    if(user && await bcrypt.compare(params.password, user.passwordHash)) {
      result.isSuccess = true
      const { passwordHash, ...data } = user.toObject()
      const token = this.authService.createToken(data)
      result.data = token
      return Promise.resolve(result)
    } else {
      result.isSuccess = false
      result.message = '账号或密码错误'
      return Promise.resolve(result)
    }
  }

  async resetPassword(params: UserResetPasswordDto): Promise<Serv.Res> {
    const result = {
      isSuccess: true,
      message: '请求成功',
      data: null
    }
    const queryUser = await this.userModel.findOne({_id: params.id}).exec()
    if(queryUser && await bcrypt.compare(params.oldPassword, queryUser.passwordHash)) {
      queryUser.passwordHash = await bcrypt.hash(params.newPassword, 10)
      const res = await queryUser.save()
      result.data = res
      return Promise.resolve(result)
    } else {
      result.isSuccess = false
      result.message = '用户不存在或密码错误'
      return Promise.resolve(result)
    }
  }

}
