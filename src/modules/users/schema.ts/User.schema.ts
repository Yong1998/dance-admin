import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, unique: true, index: true})
  account: string;

  @Prop({default: null})
  username: string;

  @Prop({required: true})
  passwordHash: string;

  @Prop({default: null, unique: true})
  email: string;

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}], required: true })
  roles: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);