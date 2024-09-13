import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpStatus, UnprocessableEntityException} from '@nestjs/common';
import { useContainer } from 'class-validator'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // 开启后 没有使用校验的DTO字段会被过滤掉undefined
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true, // 禁止 无装饰器验证的数据通过
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      stopAtFirstError: true,
      exceptionFactory: errors =>
        new UnprocessableEntityException(
          errors.map((e) => {
            const rule = Object.keys(e.constraints!)[0]
            const msg = e.constraints![rule]
            return msg
          })[0],
        ),
    }),
  )

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: 'Internal Server Error',
    });
  });


  const swaggerOptions = new DocumentBuilder()
  .setTitle('nes api doc')
  .setDescription('api doc')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
