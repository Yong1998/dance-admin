import { IsString, MinLength, IsNotEmpty, IsInt } from "class-validator";
import { Type } from 'class-transformer'

export class LoginDto {
  @IsNotEmpty({ message: '账号/密码不能为空' })
  account: string;

  // @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/) // Minimum six characters, at least one letter and one number
  @IsNotEmpty({ message: '账号/密码不能为空' })
  @IsString()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @MinLength(6, { message: '账号长度不能小于6位' })
  @IsNotEmpty({ message: '账号/密码不能为空' })
  @Type(() => String)
  account: string;

  @IsNotEmpty({ message: '账号/密码不能为空' })
  password: string;
}