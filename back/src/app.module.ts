import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from './User/User.module';
import { RoleModule } from './Role/Role.module';
import { BuildModule } from './Build/entity/Build.module';
import { DepartmentModule } from './Department/Department.module';
import { ServiceModule } from './Services/Service.module';
import { WorkModule } from './Work/work.module';
import { ApealModule } from './Apeals/Apeal.module';
import { RefreshTokenModule } from './RefreshToken/RefreshToken.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      // Entity va migration yo‘llari
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],

      synchronize: false, // ❌ endi TypeORM avtomatik o‘zgartirmaydi
      migrationsRun: false, // ❌ Nest startda avtomatik migration ishlamasin
      autoLoadEntities: true,
      logging: true, // foydali: querylarni ko‘rsatadi
    }),

    // Modullar
    UserModule,
    RoleModule,
    BuildModule,
    DepartmentModule,
    ServiceModule,
    WorkModule,
    ApealModule,
    RefreshTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log("Start")
  }
}
