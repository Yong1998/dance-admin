import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { RoleModule } from "../system/role/role.module";
import { PermModule } from "../system/permission/perm.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule,
    PermModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService]
})
export class UserModule {}