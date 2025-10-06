import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apeal } from "./entity/Apeal.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Apeal])]
})
export class ApealModule { }