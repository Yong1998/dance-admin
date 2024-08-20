import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ collection: 'permissions' })
export class Permission {
  // 父id
  @Prop({type: mongoose.Schema.Types.ObjectId, required: false, default: null, index: true})
  parentId: mongoose.Types.ObjectId | null;
  // 权限名称
  @Prop({ required: true })
  name: string;
  // 权限路径
  @Prop({ required: true })
  path: string;
  // 类型 菜单/页面/接口/按钮
  @Prop({ required: true })
  type: string;
  // 菜单icon
  @Prop({ default: null })
  icon: string;
  // 状态 禁用/启用
  @Prop({ default: 1 })
  status: string;
  // 排序
  @Prop({ required: true })
  sort: number;
  // 层级
  @Prop({ required: true })
  level: number;
  // 备注
  @Prop({ default: null })
  remark: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);