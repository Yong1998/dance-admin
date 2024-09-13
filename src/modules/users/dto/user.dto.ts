
import { IsNotEmpty, IsEmail, IsString, IsOptional, MinLength, MaxLength, ValidateIf, IsIn, ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, Allow } from "class-validator";
import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import { PagerDto } from "~/common/dto/pager.dto";
import { isEmpty } from 'lodash'

export class UserDto {
  @ApiProperty({ description: '登录账号', example: 'admin' })
  @MinLength(4)
  @MaxLength(20)
  @IsString({ message: '账号必须为字符串' })
  @IsNotEmpty({ message: '账号/密码不能为空' })
  account: string;

  @ApiProperty({ description: '登录密码', example: 'a123456' })
  @IsOptional()
  // @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, {
  //   message: '密码必须包含数字、字母，长度为6-16',
  // })
  password: string;

  @ApiProperty({ description: '用户名', example: '大定' })
  @IsString({ message: '用户名必须为字符串' })
  @IsOptional()
  username: string;
  
  @ApiProperty({ description: '昵称', example: '昵称' })
  @IsString({ message: '昵称必须为字符串' })
  @IsOptional()
  nickname: string;

  @ApiProperty({ description: '邮箱', example: '123.dev@qq.com' })
  @IsEmail()
  @ValidateIf(o => !isEmpty(o.email))
  email: string;

  @ApiProperty({ description: '头像' })
  @IsString({message: '头像必须为字符串'})
  @IsOptional()
  avatar: string;

  @ApiProperty({ description: '手机号' })
  @IsString({message: '手机号必须为字符串'})
  @IsOptional()
  phone: string;
  
  @ApiProperty({ description: '状态' })
  @IsIn([0, 1])
  status: number;

  @ApiProperty({ description: '类型' })
  @IsIn([1, 2, 3])
  type: number;

  // @ApiProperty({ description: '归属角色', type: [Number] })
  // @ArrayNotEmpty({ message: '角色不能为空' })
  // storeId: number[];

  @ApiProperty({ description: '备注' })
  @IsString({message: '备注必须为字符串'})
  @IsOptional()
  remark?: string
}

export class UserQueryDto extends IntersectionType(PagerDto, PartialType(UserDto)) { }

export class UserUpdateDto extends PartialType(UserDto) { }

export class UserPasswordDto {
  @ApiProperty({ description: '更改后的密码' })
  @IsNotEmpty({ message: '新密码不能为空' })
  password: string
}