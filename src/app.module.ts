import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/users/user.module';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { AuthModule } from 'src/modules/auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/any-exception.filter';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { ConfigModule } from '@nestjs/config';
import config from '~/config';
import { SystemModule } from './modules/system/system.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // 指定多个 env 文件时，第一个优先级最高
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      load: [...Object.values(config)],
    }),

    DatabaseModule,
    AuthModule,
    UserModule,
    SystemModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
  ],
})
export class AppModule {}
