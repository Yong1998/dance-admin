import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema.ts/User.schema";
import { Permissions, PermissionsSchema } from "./schema.ts/Permission.schema";
import { AuthModule } from "../auth/auth.module";
import { Role, RoleSchema } from "./schema.ts/Role.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permissions.name, schema: PermissionsSchema }
    ]), 
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}