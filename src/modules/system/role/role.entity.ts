import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Relation } from "typeorm";
import { CommonEntity } from "~/common/entities/common.entity";
import { PermEntity } from "../permission/perm.entity";
import { UserEntity } from "~/modules/users/user.entity";
import { StoreEntity } from "../store/store.entity";

@Entity('sys_roles')
export class RoleEntity extends CommonEntity {
  @Column({ unique: true })
  key: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number;

  @ManyToMany(() => UserEntity, user => user.roles)
  users: Relation<UserEntity[]>;

  @ManyToMany(() => PermEntity, perm => perm.roles, {})
  @JoinTable({
    name: 'sys_role_perms',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'PermId', referencedColumnName: 'id' }
  })
  permissions: Relation<PermEntity[]>;

  @ManyToMany(() => StoreEntity, store => store.roles)
  stores: StoreEntity[];
}