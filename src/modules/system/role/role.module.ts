import { Module, forwardRef } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "./role.entity";
import { PermModule } from "../permission/perm.module";
import { UserStoreRoleEntity } from "../store/store.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, UserStoreRoleEntity]),
    forwardRef(() => PermModule),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [TypeOrmModule, RoleService]
})

export class RoleModule {}