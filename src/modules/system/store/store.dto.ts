import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsArray, IsNumber } from "class-validator";

export class storeDto {
  @ApiProperty({ description: '店铺名称', example: '店铺名称' })
  @IsString({ message: '角色名称必须为字符串' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  @ApiProperty({ description: '店铺标志', example: 'SHOP1' })
  @IsString({ message: '角色标志必须为字符串' })
  @IsNotEmpty({ message: '角色标志不能为空' })
  key: string;

  @ApiProperty({ description: '店铺地址', example: '店铺地址' })
  @IsOptional()
  address: string;

  @ApiProperty({ description: '店铺备注', example: '店铺备注' })
  @IsOptional()
  remark: string;

  @ApiProperty({ description: '店铺状态', example: 1, enum: [0, 1] })
  @IsNumber()
  status: number;

  @ApiProperty({ description: '关联角色Id', type: Array })
  @IsOptional()
  @IsArray()
  roleIds: number[];
}