import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/User.entity";
import { UserService } from "./User.service";
import { UserController } from "./User.controller";
import { Role } from "src/Role/entity/role.entity";

@Module({
    imports : [TypeOrmModule.forFeature([User, Role])],
    providers : [UserService],
    controllers : [UserController]
})
export class UserModule{};
