import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

@Schema()
export abstract class BaseSchema {
  @ApiProperty({ type: String })
  @Transform(
    (value) => {
      if ('value' in value) {
        // https://github.com/typestack/class-transformer/issues/879
        return value.obj[value.key].toString();
      }

      return 'unknown value';
    },
    {
      toPlainOnly: true,
    },
  )
  public _id: string;

  @Prop({ type: 'string', default: 'isActive', enum: ['isDeleted', 'isActive'] })
  isActive: 'isDeleted' | 'isActive';

  // 自动创建时间
  @Prop({ type: 'Date', default: Date.now })
  createdAt: Date;

  // 自动更新时间
  @Prop({ type: 'Date', default: Date.now })
  updatedAt: Date;
}