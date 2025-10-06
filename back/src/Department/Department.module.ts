import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "./entity/Department.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Department])]
})
export class DepartmentModule { }