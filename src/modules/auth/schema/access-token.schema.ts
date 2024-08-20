import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "~/common/schema/base.schema";

@Schema({ collection: 'user_access_token' })
export class UserAccessToken extends BaseSchema {
  // token
  @Prop({ type: 'string', required: true })
  value: string;
  // 过期时间
  @Prop({ type: 'date', required: true })
  expiredAt: Date;
}

export const UatSchema = SchemaFactory.createForClass(UserAccessToken);