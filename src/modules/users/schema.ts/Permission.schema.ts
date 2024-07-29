import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission {
  // 权限id
  @Prop({type: mongoose.Schema.Types.ObjectId, required: true, index: true})
  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
  // 父id
  @Prop({type: mongoose.Schema.Types.ObjectId, required: true, default: null, index: true})
  parentId: mongoose.Types.ObjectId | null;
  // 权限名称
  @Prop({ required: true })
  name: string;
  // 备注
  @Prop({ default: null })
  remark: string;
  // 权限路径
  @Prop({ required: true })
  path: string;
  // 类型 菜单/页面/接口/按钮
  @Prop({ required: true })
  type: string;
  // 菜单icon
  @Prop({ default: null })
  icon: string;
  @Prop({required: true, default: 1})
  // 状态 禁用/启用
  status: string;
  @Prop({ required: true })
  sort: number;
  @Prop({ required: true })
  level: number;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);