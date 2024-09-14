import { Module, forwardRef } from "@nestjs/common";
import { PermController } from "./perm.controller";
import { PermService } from "./perm.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermEntity } from "./perm.entity";
import { RoleModule } from "../role/role.module";
import { UserStoreRoleEntity } from "../store/store.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([PermEntity, UserStoreRoleEntity]),
    forwardRef(() => RoleModule),
  ],
  controllers: [PermController],
  providers: [PermService],
  exports: [TypeOrmModule, PermService]
})

export class PermModule {}