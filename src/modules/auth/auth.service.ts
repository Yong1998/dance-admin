import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";
import { BusinessException } from "src/common/exceptions/biz.exception";
import { ErrorEnum } from "src/constants/error-code.constant";
import * as bcrypt from 'bcrypt'
import { TokenService } from "./services/token.service";




@Injectable()
export class AuthService {
  constructor( private userService: UserService, private tokenService: TokenService) {}
    
  async login(account: string, password: string):Promise<string> {
    const user = await this.userService.findUserByAccount(account)
    if(!user) {
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD)
    }

   if(!(await bcrypt.compare(password, user.passwordHash))) {
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD)
    }

    const token = await this.tokenService.generateToken(user._id, user.roles)

    return token.accessToken
  }

}