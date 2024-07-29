import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  // 角色id
  @Prop({type: mongoose.Schema.Types.ObjectId})
  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
  // 角色名称
  @Prop({required: true, unique: true, index: true})
  name: string;
  // 角色标识
  @Prop({required: true})
  key: string;
  // 角色描述
  @Prop({required: true})
  remark: string;
  // 状态
  @Prop({default: 1})
  status: number
  // 关联权限
  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Permission'}]})
  permissions: mongoose.Schema.Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);