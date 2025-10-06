import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from './User/User.module';
import { RoleModule } from './Role/Role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: (process.env.DB_PASSWORD as string),
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      type: "postgres",
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true

    }),


    // Modulllar
    UserModule,
    RoleModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log("Start")
  }
}
