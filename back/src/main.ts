import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log("Password", process.env.DB_PASSWORD)
  app.useGlobalPipes(new ValidationPipe({
    transform : true,
    forbidUnknownValues : true,
    forbidNonWhitelisted : true,
    whitelist : true
  }))
  app.setGlobalPrefix('api1');
  await app.listen(process.env.APP_PORT ?? 3000);
}
)()
