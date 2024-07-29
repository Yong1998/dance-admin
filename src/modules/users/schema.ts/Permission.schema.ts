import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PermissionsDocument = HydratedDocument<Permissions>;

@Schema()
export class Permissions {
  // 父id
  parentId: number;
  // 权限名称
  name: string;
  // 权限路径
  path: string;
  // 类型 菜单/页面/接口/按钮
  type: string;
  // 菜单icon
  icon: string;
  // 状态 禁用/启用
  status: string;
  // 关联角色
  roles: string[]
}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions);