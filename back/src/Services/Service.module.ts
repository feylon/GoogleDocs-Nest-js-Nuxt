import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "./entity/Services.entity";
import { User } from "src/User/entity/User.entity";

@Module({
    imports : [TypeOrmModule.forFeature([Service, User])]
})
export class ServiceModule{}