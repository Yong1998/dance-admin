import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class RoleDto {
  @ApiProperty({ description: '角色名称', example: '管理员' })
  @IsString({ message: '角色名称必须为字符串' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  @ApiProperty({ type: String, description: '角色标识' })
  @IsString()
  @IsNotEmpty({ message: '角色标识不能为空' })
  key: string;

  @ApiProperty({ type: String, description: '角色描述' })
  @IsString()
  @IsNotEmpty({ message: '角色描述不能为空' })
  desc: string;

  @ApiProperty({ type: Array, description: '关联菜单、权限编号' })
  @IsOptional()
  @IsArray()
  permIds: number[];

  @ApiProperty({ type: Number, description: '状态' })
  @IsNumber()
  status: number;
}