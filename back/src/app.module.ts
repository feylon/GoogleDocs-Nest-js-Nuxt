import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      type: "postgres",
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true

    }),

    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
