import { Module } from "@nestjs/common";
import { RoleModule } from "./role/role.module";
import { RouterModule } from "@nestjs/core";
import { PermModule } from "./permission/perm.module";
import { StoreModule } from "./store/store.module";

@Module({
  imports: [
    RoleModule,
    PermModule,
    StoreModule,
    RouterModule.register([
      {
        path: 'system',
        module: SystemModule,
        children: [RoleModule, PermModule, StoreModule]
      }
    ])
  ],
  exports: [RoleModule, PermModule, StoreModule]
})

export class SystemModule {}