import { Column, Entity, ManyToMany, Relation } from "typeorm";
import { CommonEntity } from "~/common/entities/common.entity";
import { RoleEntity } from "../role/role.entity";

@Entity('sys_perms')
export class PermEntity extends CommonEntity {
  @Column({ unique: true })
  key: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  parentId: number;

  @Column({type: "enum", enum: ['menu', 'button', 'api', 'other'], default: 'menu'})
  type: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: '/' })
  path: string;

  @Column({ default: 1 })
  sort: number;

  @Column({ type: "enum", enum: [1, 2, 3], default: 1})
  level: number;

  @Column({ nullable: true })
  desc: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number;

  @ManyToMany(() => RoleEntity, role => role.permissions, { onDelete: 'CASCADE' })
  roles: Relation<RoleEntity[]>
}