
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "~/modules/users/user.entity";
import { RefreshTokenEntity } from "./refresh-token.entities";
import { StoreEntity } from "~/modules/system/store/store.entity";

@Entity('user_access_tokens')
export class UserAccessEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({length: 500})
  value!: string;

  @Column({ comment: '令牌过期时间' })
  expired_at!: Date;

  @CreateDateColumn({ comment: '令牌创建时间' })
  created_at!: Date;

  @OneToOne(() => RefreshTokenEntity, refreshToken => refreshToken.accessToken, {
    cascade: true,
  })
  refreshToken!: RefreshTokenEntity

  @ManyToOne(() => UserEntity, user => user.accessTokens, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'userId', referencedColumnName: 'id'})
  user!: UserEntity

  @ManyToOne(() => StoreEntity, store => store.accessTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  store!: any
}