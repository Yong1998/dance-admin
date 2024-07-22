import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true})
  account: string;

  @Prop({default: null})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({default: null})
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);