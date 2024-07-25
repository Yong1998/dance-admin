import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/modules/users/user.module';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { AuthModule } from 'src/modules/auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/dance-admin'),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_GUARD',
    useClass: AuthGuard
  }],
})
export class AppModule {}
