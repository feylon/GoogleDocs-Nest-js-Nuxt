import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "./entity/Services.entity";

@Module({
    imports : [TypeOrmModule.forFeature([Service])]
})
export class ServiceModule{}