import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "~/common/schema/base.schema";

@Schema({ collection: 'user_refresh_token' })
export class UserRefreshToken extends BaseSchema {
  @Prop({ type: 'string', required: true })
  value: string;

  // 过期时间
  @Prop({ type: 'date', required: true })
  expiredAt: Date;

  @Prop({ type: 'string', required: true })
  accessToken: string;
}

export const UrtSchema = SchemaFactory.createForClass(UserRefreshToken);
