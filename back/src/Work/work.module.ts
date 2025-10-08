import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Work } from "./entity/Work.entity";
import { Department } from "src/Department/entity/Department.entity";
import { WorkService } from "./work.service";
import { WorkController } from "./work.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Work, Department])
    ],
    providers : [WorkService],
    controllers : [WorkController]
})
export class WorkModule { }