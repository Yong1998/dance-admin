import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './common/error.filter';
import { TransformInterceptor } from './common/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
