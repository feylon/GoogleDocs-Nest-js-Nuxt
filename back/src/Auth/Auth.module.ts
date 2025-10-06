import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RefreshToken } from "src/RefreshToken/entity/RefreshToken.entity";
import { Role } from "src/Role/entity/role.entity";
import { User } from "src/User/entity/User.entity";
import { AuthController } from "./Auth.controller";
import { AuthService } from "./Auth.service";

@Module(
    {
        imports : [TypeOrmModule.forFeature([User, Role, RefreshToken])],
        controllers : [AuthController],
        providers : [AuthService]
    }
)
export class AuthModule{}