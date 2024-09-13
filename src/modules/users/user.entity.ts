import { Column, Entity, JoinTable, ManyToMany, OneToMany, Relation } from 'typeorm';
import { CommonEntity } from '~/common/entities/common.entity';
import { UserAccessEntity } from '../auth/entities/access-token.entities';
import { RoleEntity } from '../system/role/role.entity';
import { StoreEntity } from '../system/store/store.entity';
import e from 'express';

@Entity('sys_users')
export class UserEntity extends CommonEntity {
  @Column({ unique: true })
  account: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number;
  
  @Column({ nullable: true })
  remark: string;

  @Column({ type: 'tinyint', nullable: true, default: 1})
  type: number

  @OneToMany(() => UserAccessEntity, accessToken => accessToken.user, { cascade: true })
  accessTokens: Relation<UserAccessEntity[]>;

  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable({
    name: 'sys_user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' }
  })
  roles: Relation<any[]>;

  @ManyToMany(() => StoreEntity, store => store.users)
  @JoinTable({
    name: 'sys_user_stores',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'storeId', referencedColumnName: 'id' }
  })
  stores: StoreEntity[];
}
