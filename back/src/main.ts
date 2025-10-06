import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.APP_PORT)
  app.setGlobalPrefix('api1')
  await app.listen(process.env.APP_PORT ?? 3000);
}
)()
