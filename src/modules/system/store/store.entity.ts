import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, Relation } from "typeorm";
import { CommonEntity } from "~/common/entities/common.entity";
import { RoleEntity } from "../role/role.entity";
import { UserEntity } from "~/modules/users/user.entity";
import { UserAccessEntity } from "~/modules/auth/entities/access-token.entities";

@Entity('sys_stores')
export class StoreEntity extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  key: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  remark: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number;

  @ManyToMany(() => RoleEntity, role => role.stores, )
  @JoinTable({
    name: 'sys_role_stores',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'storeId', referencedColumnName: 'id' }
  })
  roles: Relation<RoleEntity[]>;

  @ManyToMany(() => UserEntity, user => user.stores)
  users: Relation<UserEntity[]>;

  @OneToMany(() => UserAccessEntity, accessToken => accessToken.user, { cascade: true })
  accessTokens: Relation<UserAccessEntity[]>;
}

@Entity('user_store_roles') 
export class UserStoreRoleEntity extends CommonEntity {
  @Column()
  userId: number;

  @Column()
  storeId: number;

  @Column()
  roleId: number;

  @ManyToOne(() => UserEntity, user => user.stores)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => StoreEntity, store => store.users)
  @JoinColumn({ name: 'storeId' })
  store: StoreEntity;

  @ManyToOne(() => RoleEntity, role => role.stores)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;
}