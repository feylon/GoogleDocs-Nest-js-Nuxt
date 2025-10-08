import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "./entity/Department.entity";
import { Build } from "src/Build/entity/Build.entity";
import { DepartmanetService } from "./Department.service";
import { DepartmentController } from "./Department.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Department, Build])],
    providers : [DepartmanetService],
    controllers: [DepartmentController]
})
export class DepartmentModule { }