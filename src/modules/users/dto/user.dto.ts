
import { IsNotEmpty, IsEmail, IsString, IsOptional } from "class-validator";
export class UserCreateDto {

  @IsOptional()
  @IsString({ message: '用户名必须为字符串'})
  username: string;
  
  @IsOptional()
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsNotEmpty({ message: '账号/密码不能为空' })
  account: string;

  @IsNotEmpty({ message: '账号/密码不能为空' })
  password: string;
}

export class UserLoginDto {
  @IsNotEmpty({ message: '账号/密码不能为空' })
  account: string;

  @IsNotEmpty({ message: '账号/密码不能为空' })
  password: string;
}

export class UserResetPasswordDto {
  @IsNotEmpty({ message: '用户ID不能为空' })
  id: string;

  @IsNotEmpty({ message: '旧密码不能为空' })
  oldPassword: string;

  @IsNotEmpty({ message: '新密码不能为空' })
  newPassword: string;
}