import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Build } from "./entity/Build.entity"; 
import { BuildService } from "./Build.service";
import { BuildController } from "./Build.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Build])],
    providers : [BuildService],
    controllers : [BuildController]
})
export class BuildModule { }