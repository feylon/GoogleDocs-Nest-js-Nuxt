import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RefreshToken } from "./entity/RefreshToken.entity";

@Module({ imports : [TypeOrmModule.forFeature([RefreshToken])] })
export class RefreshTokenModule{}


