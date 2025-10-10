import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/User.entity";
import { UserService } from "./User.service";
import { UserController } from "./User.controller";

@Module({
    imports : [TypeOrmModule.forFeature([User])],
    providers : [UserService],
    controllers : [UserController]
})
export class UserModule{};
