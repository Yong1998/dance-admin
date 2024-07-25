import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true, unique: true})
  account: string;

  @Prop({default: null})
  username: string;

  @Prop({required: true})
  passwordHash: string;

  @Prop({default: null, unique: true})
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);