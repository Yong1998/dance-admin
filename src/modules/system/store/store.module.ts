import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreEntity, UserStoreRoleEntity } from "./store.entity";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";
import { RoleEntity } from "../role/role.entity";
import { UserEntity } from "~/modules/users/user.entity";
import { RoleModule } from "../role/role.module";
import { UserModule } from "~/modules/users/user.module";
import { TokenService } from "~/modules/auth/services/token.service";
import { AuthModule } from "~/modules/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity, UserStoreRoleEntity, RoleEntity, UserEntity]),
    forwardRef(() => RoleModule),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [StoreController],
  providers: [StoreService, TokenService],
  exports: [TypeOrmModule, StoreService]
})

export class StoreModule {}