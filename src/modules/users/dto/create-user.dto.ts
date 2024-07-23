
import { IsNotEmpty } from "class-validator";
export class CreateUserDto {
  username: string;
  email: string;

  @IsNotEmpty({ message: '账号/密码不能为空' })
  account: string;

  @IsNotEmpty({ message: '账号/密码不能为空' })
  password: string;
}