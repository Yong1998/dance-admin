import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class PermDto {

  @ApiProperty({ description: '权限名称', example: '用户管理' })
  @IsString({ message: '权限名称必须为字符串' })
  @IsNotEmpty({ message: '权限名称不能为空' })
  name: string;

  @ApiProperty({ type: String, description: '权限标识', example: 'system:user:list' })
  @IsString({ message: '权限标识必须为字符串' })
  @IsNotEmpty({ message: '权限标识不能为空' })
  key: string;

  @ApiProperty({ type: Number, description: '父级权限ID', default: null })
  @IsOptional()
  parentId: number;

  @ApiProperty({ type: String, description: '权限类型', default: 'menu' })
  @IsString({ message: '权限类型必须为字符串' })
  @IsNotEmpty({ message: '权限类型不能为空' })
  type: 'menu' | 'button' | 'api' | 'other';

  @ApiProperty({ type: String, description: '图标', default: null })
  @IsOptional()
  icon: string;

  @ApiProperty({ type: String, description: '路径', default: '/' })
  @IsString({ message: '路径必须为字符串' })
  @IsNotEmpty({ message: '路径不能为空' })
  path: string;

  @ApiProperty({ type: Number, description: '排序', default: 1 })
  @IsOptional()
  sort: number;

  @ApiProperty({ type: Number, description: '层级', default: 1 , enum: [1, 2, 3] })
  level: number;

  @ApiProperty({ type: String, description: '描述' })
  @IsString({ message: '描述必须为字符串' })
  desc: string;

  @ApiProperty({ type: Number, description: '是否启用', default: 1 })
  status: number;
}
export class PermUpdateDto extends PartialType(PermDto) {}