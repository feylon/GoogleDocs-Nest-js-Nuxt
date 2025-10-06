import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Work } from "./Work.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Work])
    ]
})
export class WorkModule { }