
import { IsNotEmpty, IsEmail, IsString, IsOptional, MinLength, MaxLength, ValidateIf, IsIn, ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, Allow } from "class-validator";
import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import { PagerDto } from "~/common/dto/pager.dto";
import { isEmpty } from 'lodash'

export class UserDto {
  @ApiProperty({ description: '登录账号', example: 'admin' })
  @IsNotEmpty({ message: '账号/密码不能为空' })
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  account: string;

  @ApiProperty({ description: '登录密码', example: 'a123456' })
  @IsOptional()
  // @Matches(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Za-z])\S*$/, {
  //   message: '密码必须包含数字、字母，长度为6-16',
  // })
  password: string;

  @ApiProperty({ description: '用户名', example: '大定' })
  @IsOptional()
  @IsString()
  username: string;
  
  @ApiProperty({ description: '昵称', example: '昵称' })
  @IsOptional()
  @IsString()
  nickname: string;

  @ApiProperty({ description: '邮箱', example: '123.dev@qq.com' })
  @IsEmail()
  @ValidateIf(o => !isEmpty(o.email))
  email: string;

  @ApiProperty({ description: '头像' })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ description: '手机号' })
  @IsOptional()
  @IsString()
  phone: string;
  
  @ApiProperty({ description: '状态' })
  @IsIn([0, 1])
  status: number;

  @ApiProperty({ description: '归属角色', type: [String] })
  // @ArrayNotEmpty()
  // @ArrayMinSize(1)
  // @ArrayMaxSize(3)
  roles: string[];

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string
}

export class UserQueryDto extends IntersectionType(PagerDto, PartialType(UserDto)) { }

export class UserUpdateDto extends PartialType(UserDto) { }

export class UserPasswordDto {
  @ApiProperty({ description: '更改后的密码' })
  @IsNotEmpty({ message: '新密码不能为空' })
  password: string
}