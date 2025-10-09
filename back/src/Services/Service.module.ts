import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "./entity/Services.entity";
import { User } from "src/User/entity/User.entity";
import { ServiceController } from "./Service.controller";
import { Service_Service } from "./Service.service";

@Module({
    imports : [TypeOrmModule.forFeature([Service, User])],
    controllers : [ServiceController],
    providers : [Service_Service]
})
export class ServiceModule{}