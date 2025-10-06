import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Build } from "./Build.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Build])]
})
export class BuildModule { }