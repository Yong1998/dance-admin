import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from 'src/common/schema/base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({collection: 'users'})
export class User extends BaseSchema {
  @Prop({required: true, unique: true})
  account: string;

  @Prop({required: true})
  passwordHash: string;

  @Prop({default: null})
  username: string;

  @Prop({default: null})
  nickname: string;

  @Prop({default: null})
  email: string;

  @Prop({default: null})
  avatar: string;

  @Prop({default: null})
  phone: string;

  @Prop({ type: 'number', default: 1, enum: [0, 1] })
  status: number;

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}], required: true })
  roles: string[];

  @Prop({type:[{type: String, ref: 'UserAccessToken'}]})
  accessTokens: string[];

  @Prop({default: null})
  remark: string;
}

export const UserSchema = SchemaFactory.createForClass(User);